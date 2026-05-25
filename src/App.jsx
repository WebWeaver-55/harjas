import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Locations from './components/Locations';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Rooms />
        <Amenities />
        <Gallery />
        <Locations />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;