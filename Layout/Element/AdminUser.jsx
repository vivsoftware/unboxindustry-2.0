import { useRouter } from 'next/router';
import { User } from 'react-feather';
const AdminUser = () => {
  const router = useRouter();

  return (
    <>
    <div className='d-none d-xl-block d-md-block d-sm-none'>
      <div className='cart-icon'>
        <User /> 
        {/* <p style={{paddingTop: "1px", paddingLeft: "16px"}}>Login Now</p>  */}

      </div>
      </div>
      <div className='d-block d-xl-none d-md-none d-sm-block'>
      <div className='cart-icon'>
        <User style={{color:'white'}} h/>

      </div>
      </div>
    </>


  )

};
export default AdminUser;