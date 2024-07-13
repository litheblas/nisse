import Backdrop from '@mui/material/Backdrop'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MembersService } from '../api'
import { Member } from '../api/models/Member'
import style from './styling/CreateMemberPopup.module.css'

interface MemberPopupProps {
  onClose: () => void
}

export const CreateMemberPopup: React.FC<MemberPopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<
    Omit<
      Member,
      | 'id'
      | 'full_name'
      | 'short_name'
      | 'real_name'
      | 'active_period'
      | 'memberships'
      | 'engagements'
      | 'complete_adress'
    >
  >({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const newMember: Member = {
        ...formData,
        id: '',
        full_name: '',
        short_name: '',
        real_name: '',
        active_period: '',
        memberships: [],
        engagements: [],
        complete_adress: '',
      }

      const createdMember = await MembersService.membersCreate(newMember)
      setSuccess('Member created successfully!')
      setError('')
      onClose() // Close the popup on success
      navigate(`/members/edit/${createdMember.id}`)
    } catch (error) {
      setError('Error creating member: ' + (error as Error).message)
      setSuccess('')
    }
  }

  return (
    <Backdrop open={true} onClick={onClose} className={style.popup_overlay}>
      <div className={style.popup} onClick={(e) => e.stopPropagation()}>
        <button className={style.close_button} onClick={onClose}>
          X
        </button>
        <h2>Skapa ny medlem</h2>
        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
          <div className={style.formGroup}>
            <label>Användarnamn:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Förnamn:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Efternamn:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Mejl:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={style.submitButton}>
            Skapa användare
          </button>
        </form>
        {error && <p className={style.error}>{error}</p>}
        {success && <p className={style.success}>{success}</p>}
      </div>
    </Backdrop>
  )
}
