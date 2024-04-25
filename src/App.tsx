import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "./Dropdown";

function App() {
  return (
    <main className="h-dvh w-full bg-slate-800 flex items-center justify-center">
      <Dropdown>
        <DropdownTrigger className="bg-rose-600 text-white rounded-lg border border-white px-3 py-2 hover:bg-rose-500">
          Open Dropdown
        </DropdownTrigger>
        <DropdownMenu className="my-4">
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </main>
  );
}

export default App;
