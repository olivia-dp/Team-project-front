import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginThunk } from "../../redux/Auth/operations";
import { Login } from "../../schemas/schemas.js";
import s from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await dispatch(loginThunk(values)).unwrap();
      toast.success("Welcome, ${data.user.username}!");
      resetForm();
      navigate("/DashboardPage");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <div className={s.label}>
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>
          <div className={s.label}>
            <Field
              className={s.input}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className={s.error} />
          </div>

          <button
            type="submit"
            className={s.button_reg}
            disabled={isSubmitting}
          >
            {isSubmitting ? <div className={s.loader}></div> : "Login"}
          </button>

          <Link className={s.link} to="/register">
            <button type="button" className={s.button_log}>
              Registration
            </button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
