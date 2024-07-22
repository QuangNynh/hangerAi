import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function DashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard/home');
  }, [navigate]);
  return <></>;
}
