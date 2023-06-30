<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleSubmit" class="flex flex-col justify-center gap-y-4 mt-5 bg-gray-800 p-4 rounded-lg shadow-lg" novalidate>
      <div>
        <label class="text-white"  for="name">Name*</label>
        <CustomInput v-model:value="data.name" id="name" type="text" />
        <div class="text-rose-500" v-if="errors.name">{{ errors.name }}</div>
      </div>
      <div>
        <label class="text-white"  for="email">Email*</label>
        <CustomInput v-model:value="data.email" id="email" type="email" />
        <div class="text-rose-500" v-if="errors.email">{{ errors.email }}</div>
      </div>
      <div>
        <label class="text-white"  for="repeatEmail">Repeat email*</label>
        <CustomInput v-model:value="data.repeatEmail" id="repeatEmail" type="email" />
        <div class="text-rose-500" v-if="errors.repeatEmail">{{ errors.repeatEmail }}</div>
      </div>
      <div>
        <label class="text-white"  for="password">Password*</label>
        <CustomInput v-model:value="data.password" id="password" type="password" />
        <div class="text-rose-500" v-if="errors.password">{{ errors.password }}</div>
      </div>
      <div>
        <label class="text-white"  for="repeatPassword">Repeat Password*</label>
        <CustomInput v-model:value="data.repeatPassword" id="repeatPassword" type="password" />
        <div class="text-rose-500" v-if="errors.repeatPassword">{{ errors.repeatPassword }}</div>
      </div>
  
      <CustomButton type="submit"> Submit </CustomButton>
    </form>
  </div>
    
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import CustomInput from '@/components/CustomInput.vue'
  import CustomButton from '@/components/CustomButton.vue'
  import { nameValidation } from '@/utils/nameValidation'
  import { emailValidation } from '@/utils/emailValidation'
  import { matchValidation } from '@/utils/matchValidation'
  import { passwordValidation } from '@/utils/passwordValidation'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const data = reactive({
    name: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
  })
  
  const errors = reactive({
    name: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
  })
  
  const handleSubmit = async () => {
    const { isValid: isNameValid, errorMessage: nameErrorMessage } = nameValidation(data.name)
    if (!isNameValid) {
      errors.name = nameErrorMessage
    } else {
      errors.name = ''
    }
  
    const { isValid: isEmailValid, errorMessage: emailErrorMessage } = emailValidation(data.email)
    if (!isEmailValid) {
      errors.email = emailErrorMessage
    } else {
      errors.email = ''
    }

    const { isValid: doEmailsMatch, errorMessage: repeatEmailErrorMessage } = matchValidation(data.email, data.repeatEmail)
    if (!doEmailsMatch) {
      errors.repeatEmail = repeatEmailErrorMessage
    } else {
      errors.repeatEmail = ''
    }

    const { isValid: isPasswordValid, errorMessage: passwordErrorMessage } = passwordValidation(data.password)
    if (!isPasswordValid) {
      errors.password = passwordErrorMessage
    } else {
      errors.password = ''
    }

    const { isValid: doPasswordsMatch, errorMessage: repeatPasswordErrorMessage } = matchValidation(data.password, data.repeatPassword)
    if (!doPasswordsMatch) {
      errors.repeatPassword = repeatPasswordErrorMessage
    } else {
      errors.repeatPassword = ''
    }

    if (!isNameValid || !isPasswordValid || !doEmailsMatch || !isPasswordValid || !doPasswordsMatch) {
      return
    }
  
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
    if (response.ok) {
      router.push('/')
      console.log('data', data)
    } else {
      const error = await response.json()
      console.log(error)
    }
  }
  </script>
  