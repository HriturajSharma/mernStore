import Button from '../../components/common/Button/index'
import AllUsers from '../../components/UsersData/AllUsers'
function index ({}) {

  return (
    <div>
      check
      <Button
        style={{ backgroundColor: 'red' }}
        content={'Register'}
      />
      <AllUsers/>
    </div>
  )
}

export default index
