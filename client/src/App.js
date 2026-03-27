import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <h1>Billing System</h1>
      <InvoiceForm />
      <InvoiceList />
    </div>
  );
}

export default App;
