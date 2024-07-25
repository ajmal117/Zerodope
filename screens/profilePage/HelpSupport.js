import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([]);

  // Mock data for tickets
  const mockTickets = [
    { id: 1, title: "Issue with login", status: "Open" },
    { id: 2, title: "Feature request", status: "Pending" },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Implement search functionality here to filter tickets based on searchQuery
    // Example: filter tickets based on title
    const filteredTickets = mockTickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(text.toLowerCase())
    );
    setTickets(filteredTickets);
  };

  const renderTicket = (ticket) => {
    return (
      <View key={ticket.id} style={styles.ticket}>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>
        <Text style={styles.ticketStatus}>{ticket.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tickets</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tickets"
          placeholderTextColor="#333" // Set placeholder text color here
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      {tickets.length > 0 ? (
        <View style={styles.ticketsContainer}>{tickets.map(renderTicket)}</View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No support tickets found</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Raise a request</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    fontSize: 16,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 20,
    color: "#333",
    backgroundColor: "#fff",
  },
  ticketsContainer: {
    flex: 1,
  },
  ticket: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  ticketStatus: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HelpSupport;
