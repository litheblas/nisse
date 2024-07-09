import * as Form from '@radix-ui/react-form'
import { ChangeEvent, useState } from 'react'
import { Member } from '../api'
import style from './styling/EditMemberForm.module.css'

interface EditMemberFormProps {
  baseMember: Member
  profilePicUrl: string
  onSubmit: (member: Member) => void
}

export const EditMemberForm = ({
  baseMember,
  profilePicUrl,
  onSubmit,
}: EditMemberFormProps) => {
  const [displayImage, setDisplayImage] = useState<string>(profilePicUrl)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDisplayImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleSubmit = (member: React.FormEvent<HTMLFormElement>) => {
    member.preventDefault()
    const data = Object.fromEntries(new FormData(member.currentTarget))

    const submittedMember: Member = {
      ...baseMember,
      email: data.email as string,
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      nickname: data.nickname as string,
      birth_date: data.birth_date as string,
      liu_id: data.liu_id as string,
      pronouns: data.pronouns as string,
      street_address: data.street_address as string,
      postal_code: data.postal_code as string,
      postal_country: data.postal_country as string,
      phone_number_1: data.phone_number_1 as string,
      phone_number_2: data.phone_number_2 as string,
      phone_number_3: data.phone_number_3 as string,
      arbitrary_text: data.arbitrary_text as string,
      national_id: data.national_id as string,
      profile_picture: data.profile_picture as string, //is this correct?
      /*
               .---.
              / | \_\
             /  /  ._\      @   @
             \ |:  / /     / \
              \ /  \/ (Wait, it's  all 'string'?)
               `---´

              .---.
             / | \_\
            /  /  ._\      @  ¬@
            \ |:  / /         / \
             \ /  \/    (Always has been)
              `---´
            */
    }
    onSubmit(submittedMember)
  }

  return (
    <Form.Root onSubmit={handleSubmit}>
      {/*profile_picture*/}
      <Form.Field className={style.FormField} name="profile_picture">
        <div className={style.profileImageContainer}>
          <img src={displayImage} alt="Profilbild" />
        </div>
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Profilbild </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            type="file"
            id="profile_picture"
            key={baseMember.profile_picture}
            accept="image/png, image/jpeg"
            title="Välj profilbild"
            onChange={handleImageChange}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*first_name */}
      <Form.Field className={style.FormField} name="first_name">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Förnamn</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={200}
            defaultValue={baseMember.first_name}
            key={baseMember.first_name}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*last_name */}
      <Form.Field className={style.FormField} name="last_name">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Efternamn</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={200}
            defaultValue={baseMember.last_name}
            key={baseMember.last_name}
          ></input>
        </Form.Control>
      </Form.Field>

      {/* nickname*/}
      <Form.Field className={style.FormField} name="nickname">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Blåsnamn</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={200}
            defaultValue={baseMember.nickname}
            key={baseMember.nickname}
          ></input>
        </Form.Control>
      </Form.Field>

      {/* national_id*/}
      <Form.Field className={style.FormField} name="national_id">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Personnummer</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={200}
            defaultValue={baseMember.national_id}
            key={baseMember.national_id}
          ></input>
        </Form.Control>
      </Form.Field>

      {/* email */}
      <Form.Field className={style.FormField} name="email">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Mejl ✉️</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="email"
            maxLength={200}
            defaultValue={baseMember.email}
            key={'href' + baseMember.email}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*birth_date*/}
      <Form.Field className={style.FormField} name="birth_date">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Födelsedag 🎂 </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="date"
            defaultValue={
              typeof baseMember.birth_date === 'string'
                ? new Date(baseMember.birth_date).toISOString().slice(0, 10)
                : ''
            }
            key={
              typeof baseMember.birth_date === 'string'
                ? new Date(baseMember.birth_date).toISOString().slice(0, 10)
                : ''
            }
          ></input>
        </Form.Control>
      </Form.Field>

      {/*liu_id*/}
      <Form.Field className={style.FormField} name="liu_id">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Liu ID </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={8}
            defaultValue={baseMember.liu_id}
            key={baseMember.liu_id}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*pronouns*/}
      <Form.Field className={style.FormField} name="pronouns">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Pronomen </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={20}
            defaultValue={baseMember.pronouns}
            key={baseMember.pronouns}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*street_address*/}
      <Form.Field className={style.FormField} name="street_addres">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Adress 🏡</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={50}
            defaultValue={baseMember.street_address}
            key={baseMember.street_address}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*postal_code*/}
      <Form.Field className={style.FormField} name="postal_code">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Postkod </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={10}
            defaultValue={baseMember.postal_code}
            key={baseMember.postal_code}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*postal_country*/}
      <Form.Field className={style.FormField} name="postal_country">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Ort? </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={50}
            defaultValue={baseMember.postal_country}
            key={baseMember.postal_country}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*phone_number_1*/}
      <Form.Field className={style.FormField} name="phone_number_1">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Telefon nr. 1 📱</Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={20}
            defaultValue={baseMember.phone_number_1}
            key={baseMember.phone_number_1}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*phone_number_2*/}
      <Form.Field className={style.FormField} name="phone_number_2">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Telefon nr. 2 📞 </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={20}
            defaultValue={baseMember.phone_number_2}
            key={baseMember.phone_number_2}
          ></input>
        </Form.Control>
      </Form.Field>

      {/*phone_number_3*/}
      <Form.Field className={style.FormField} name="phone_number_3">
        <div className={style.FormFieldLabelContainer}>
          <Form.Label className={style.FormLabel}>Telefon nr. 3 ☎️ </Form.Label>
        </div>
        <Form.Control asChild>
          <input
            className={style.Input}
            type="text"
            maxLength={20}
            defaultValue={baseMember.phone_number_3}
            key={baseMember.phone_number_3}
          ></input>
        </Form.Control>
      </Form.Field>

      {/* arbitrary_text */}
      <Form.Field className={style.FormField} name="arbitrary_text">
        <Form.Label className={style.FormLabel}>Fritext 📝🔥</Form.Label>
        <Form.Control asChild>
          <textarea
            className={style.Textarea}
            defaultValue={baseMember.arbitrary_text}
            key={baseMember.arbitrary_text}
            rows={20}
          />
        </Form.Control>
      </Form.Field>

      {/* Submit button */}
      <Form.Submit asChild>
        <button className={`${style.Button} standardButton blueButton`}>
          Spara
        </button>
      </Form.Submit>
    </Form.Root>
  )
}
