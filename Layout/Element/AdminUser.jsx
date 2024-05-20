import { useRouter } from 'next/router';
import { User } from 'react-feather';
const AdminUser = () => {
  const router = useRouter();

  return (
    <>
    <div className='d-none d-xl-block d-md-block d-sm-none'>
      <div className='cart-icon'>
        <User /> 
        <span><p style={{fontSize: "14px", paddingLeft: "4px", paddingTop: "8px"}}>Login Now</p></span>
      </div>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block'>
      <div className='cart-icon'>
        <User style={{color:'white'}}/>
      </div>
      </div>
    </>


  )

};
export default AdminUser;