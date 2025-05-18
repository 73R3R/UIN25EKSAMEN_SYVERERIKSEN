import { useState } from 'react';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  //endrer state basert på submit av form
  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }
//login state true innhold
  if (isLoggedIn) {
    return (
      <>
        <h1>Min side</h1>
        <p>Du er nå logget inn.</p>
        <button onClick={() => setIsLoggedIn(false)}>Logg ut</button>
      </>
    )
  }

  return (
    <>
      <h1>Logg inn</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Brukernavn" />
        <button type="submit">Logg Inn</button>
      </form>
    </>
  )
}