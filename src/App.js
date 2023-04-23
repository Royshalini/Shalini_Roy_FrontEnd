import Solution from "./components/Solution";


function App() {
  return (
    <div className="App">
    <Solution
    // array of object with some list 
    items={[
      {text:"Hello This is Shalini Roy"},
      {text:"Currently I am pursuing B-Tech in CSE."},
      {text:"My hometown is in Munger , Bihar."},
      {text:"My Technical skills are HTML , CSS , JS ,  React ,SQL ,CPP"},
      {text:"Apart from technical skill I am a hardworking and dedicated person"},
      {text:"My hobbey is painting , listening to peaceful music and doing Yoga & Meditation"},
      {text:"Thankyou!!"}
    ]}
    
    />
    </div>
  );
}

export default App;
