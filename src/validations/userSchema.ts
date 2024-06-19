import { z } from 'zod'

const countries = ['ar', 'br', 'ch'] as const;
export type Country = (typeof countries)[number];

export const mappedCountries: { [key in Country]: string } = {
    ar: 'Argentina',
    br: 'Brazil',
    ch: 'Switzerland'
}

export const userSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Name must be at least 3 characters"
        }).max(200, {
            message: "Name must be less than 200 characters"
        }),
    email: z
        .string()
        .email({
            message: "Please enter a valid email"
        }),
    password: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters"
        }),
    confirmPassword: z
        .string()
        .min(6, {
            message: "Password must be at least 6 characters"
        }),
    cellphone: z.string()
        .min(9, 'El celular debe tener exactamente 9 dígitos')
        .max(9, 'El celular debe tener exactamente 9 dígitos')
        .refine(value => /^\d{9}$/.test(value), {
            message: 'El celular debe contener solo números'
        })
        .refine(value => value.startsWith('9'), {
            message: 'El celular debe comenzar con el número 9'
        }),
    dateBirth: z
        .string()
        .refine(dob => new Date(dob).toString() !== 'Invalid Date', {
            message: 'Please enter a valid date'
        }),
    country: z
        .enum(countries, {
            errorMap: () => ({ message: '--Select a country--' })
        })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})