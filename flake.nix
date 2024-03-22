{
  description = "A flake for developing NISSE";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    devShell.x86_64-linux = let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;

      podmanSetupScript = let
        registriesConf = pkgs.writeText "registries.conf" ''
          [registries.search]
          registries = ['docker.io']
          [registries.block]
          registries = []
        '';
      in pkgs.writeScript "podman-setup" ''
        #!${pkgs.runtimeShell}
        # Dont overwrite customised configuration
        if ! test -f ~/.config/containers/policy.json; then
          install -Dm555 ${pkgs.skopeo.src}/default-policy.json ~/.config/containers/policy.json
        fi
        if ! test -f ~/.config/containers/registries.conf; then
          install -Dm555 ${registriesConf} ~/.config/containers/registries.conf
        fi
      '';

      dockerCompat = pkgs.runCommandNoCC "docker-podman-compat" {} ''
        mkdir -p $out/bin
        ln -s ${pkgs.podman}/bin/podman $out/bin/docker
      '';

    in pkgs.mkShell {
      buildInputs = [
        dockerCompat
        pkgs.python311
        pkgs.pipenv
        pkgs.nodejs_20
        pkgs.podman
        pkgs.podman-compose
        pkgs.pre-commit
      ];

      shellHook = ''
        # Install required configuration
        ${podmanSetupScript}

        # TODO: Make this work
        # echo "Running Docker Compose..."
        # podman compose -f backend/docker-compose-dev-database.yml -p nisse-dev-db up -d

        # function cleanup {
        #     echo "Shutting down Docker Compose..."
        #     podman compose -f backend/docker-compose-dev-database.yml -p nisse-dev-db down
        # }
        # trap cleanup EXIT
      '';
    };
  };
}
