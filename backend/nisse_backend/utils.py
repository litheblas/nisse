def drf_spectacular_ignore_endpoints(endpoints):
    filtered = []
    for path, path_regex, method, callback in endpoints:
        if not path.startswith("/api/schema/"):
            filtered.append((path, path_regex, method, callback))
    return filtered
