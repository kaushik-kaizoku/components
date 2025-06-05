import StoryComponent from "./components/story"

function App() {

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-white ">Hover on the card to start animation.</p>
        <StoryComponent />
      </div>
    </>
  )
}

export default App
