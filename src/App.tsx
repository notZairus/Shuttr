import { Route, Switch } from "wouter";
import LandingPage from "@/pages/LandingPage";
import CameraRoom from "@/pages/CameraRoom";
import Customize from "@/pages/CustomizeStrip";
import About from "@/pages/About";
import AppLayout from "@/Layout";

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route path="/" component={LandingPage} />
          
          <Route path="/camera" component={CameraRoom} />
          <Route path="/customize" component={Customize} />

          <Route path="/about" component={About} />

        </Switch>
      </AppLayout>
    </>
  )
}

export default App
