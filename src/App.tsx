import { Route, Switch } from "wouter";
import LandingPage from "@/pages/LandingPage";
import CameraRoom from "@/pages/CameraRoom";
import Customize from "@/pages/CustomizeStrip";
import AppLayout from "@/Layout";

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/camera" component={CameraRoom} />
          <Route path="/customize" component={Customize}/>
        </Switch>
      </AppLayout>
    </>
  )
}

export default App
