import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { userSchema, mappedCountries } from "./validations/userSchema";
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, Select, TextField } from "@mui/material";

type Person = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  cellphone: string;
  dateBirth: string;
  terms: boolean;
}

function App() {

  const { register, handleSubmit, reset, formState: { errors }
  } = useForm<Person>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const countryOptions = Object.entries(mappedCountries).map(([key, value]) =>
    <option key={key} value={key}>{value}</option>);

  const onSubmit = handleSubmit((data) => {
    //antes de enviar getPostData()
    //enviar al servidor
    alert('sending data....')
    reset();
    console.log(data)
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            label="Nombre"
            variant="outlined"
            fullWidth
            autoFocus
            InputLabelProps={{
              shrink: true
            }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Correo"
            variant="outlined"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirmPassword"
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cellphone"
            label="Celular"
            variant="outlined"
            fullWidth
            required
            error={!!errors.cellphone}
            helperText={errors.cellphone?.message}
            {...register('cellphone')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="dateBirth"
            label="Fecha de Nacimiento"
            type="date"
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            error={!!errors.dateBirth}
            helperText={errors.dateBirth?.message}
            {...register('dateBirth')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth error={!!errors.country}>
            <InputLabel id="country-label">País</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              required
              label="País"
              placeholder="-- Seleccionar --"
              {...register('country')}
            >
              {countryOptions}
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={!!errors.terms}>
            <FormControlLabel
              control={<Checkbox {...register('terms')} />}
              label="Acepto los términos y condiciones"
            />
            <FormHelperText>{errors.terms?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default App