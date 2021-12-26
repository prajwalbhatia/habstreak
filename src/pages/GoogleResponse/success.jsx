import React , {useEffect} from 'react';

function Success(props) {
  useEffect(() => {
    setTimeout(() => {
        window.close()
    }, 1000);
  } , [])

  return (
    <div>
      <h4>Thank you for login</h4>
    </div>
  );
}

export default Success;