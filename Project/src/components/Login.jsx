import React from "react";

import { useForm, Controller } from "react-hook-form";

function Login() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "" },
  });

  const onSubmit = (d) => {
    console.log(d);
  };

  const handleClearAll = () => {
    reset();
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={"firstName"}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (

            
            <>
              <label>First name:</label>
              <br />
              <input type="text" {...field} />
              <br />
            </>
          )}
        />
        {errors.firstName && <><span>This is required.</span><br/></>}

        <Controller
          name={"lastName"}
          control={control}
          render={({ field }) => (
            <>
              {console.log(field)}
              <label>Last name:</label>
              <br />
              <input type="text" {...field} />
              <br />
            </>
          )}
        />

        <input type="submit" value="Submit" />
        <input type="reset" value="reset" onClick={handleClearAll} />
      </form>
    </>
  );
}

export default Login;
