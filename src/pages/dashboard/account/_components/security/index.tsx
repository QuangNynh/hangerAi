import { Fragment } from 'react/jsx-runtime';
import PasswordForm from './_components/password-form';
import NotificationForm from './_components/notification-form';

export default function SecurityTab() {
  return (
    <Fragment>
      <PasswordForm />
      <NotificationForm />
    </Fragment>
  );
}
