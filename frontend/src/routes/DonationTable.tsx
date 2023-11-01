import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  TextField,
} from "@mui/material";

const columns = ["ID", "Name", "Address", "Total Donations", "Actions"];

const data = [
  { id: 1, name: "John Doe", address: "123 Main St", totalDonations: 500 },
  { id: 2, name: "Jane Smith", address: "456 Elm St", totalDonations: 300 },
  // Add more data as needed
];

function DonationTable() {
  const [open, setOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
    setDonationAmount("");
  };

  const handleDonationSubmit = () => {
    // Handle the donation submission here
    // You can send the donationAmount and selectedId to your server or update the data locally
    console.log(
      `Donation of ${donationAmount} for ID ${selectedId} submitted.`
    );
    handleClose();
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.totalDonations}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleOpen(row.id)}>
                  Donate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Enter Donation Amount</h2>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full mb-4"
          />
          <div className="mt-5">
            <Button
              variant="contained"
              color="primary"
              onClick={handleDonationSubmit}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DonationTable;
