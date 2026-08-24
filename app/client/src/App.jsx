import { useState } from 'react'
import Header from './components/common/Header'
import Home from './pages/Home'
import Register from './pages/register/index'

function App() {

  const [isLogin,setIsLogin ] = useState(false)

  return (  
    // <div>App</div>
    <>  
     <Register setIsLogin={setIsLogin}/>
    <Header/>
    <Home/>
    </>
  )
}

export default App