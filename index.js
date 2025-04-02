// Define the common dropdown content with event listeners
const dropdownContentHTML = `
    <div class="dice_dropdown_content">
        <a href="#" data-die="d4">4</a>
        <a href="#" data-die="d6">6</a>
        <a href="#" data-die="d8">8</a>
        <a href="#" data-die="d10">10</a>
        <a href="#" data-die="d12">12</a>
    </div>
`;

// Attach dropdown content and functionality to each dropdown
document.querySelectorAll(".dice_dropdown").forEach(dropdown => {
    dropdown.innerHTML += dropdownContentHTML;

    const button = dropdown.querySelector(".dice_drop_button");
    const display = dropdown.querySelector(".selected_die");

    // Toggle dropdown on button click
    button.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });

    // Handle selection
    dropdown.querySelectorAll(".dice_dropdown_content a").forEach(option => {
        option.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent page jump
            const selectedDie = event.target.getAttribute("data-die"); // Get dice name
            display.textContent = selectedDie; // Update the display
            dropdown.classList.remove("active"); // Close dropdown
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function(event) {
    document.querySelectorAll(".dice_dropdown").forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });
});

document.querySelectorAll(".roll_button").forEach(button => {
    button.addEventListener("click", function() {
        // So the first one is our previous span of d6
        let dropdown = this.previousElementSibling;
        // This one is the next span
        let rollResultSpin = this.nextElementSibling;

        let selectedDie = dropdown.textContent.trim(); // this gets rid of any extra whitespace
        if (!selectedDie) {
            rollResultSpin.textContent = "Select a die!";
            return;
        }

        let maxRoll = parseInt(selectedDie.substring(1)); // This gets our value for the roll
        if(!maxRoll) {
            rollResultSpin.textContent = "Not Valid!";
            return;
        }

        let roll = Math.floor(Math.random() * maxRoll) + 1;
        rollResultSpin.textContent = `Rolled: ${roll}`; // displays the result
    })
})

// Adding in the dynamic rows for Edges & Hindrances
document.getElementById("add_edge_hind").addEventListener("click", function() {
    let container = document.getElementById("edges_hind_list");

    let row = document.createElement("div");
    // classList is a read only. Getting attributes of the class elements
    row.classList.add("edge_hind_row");

    // This is choosing the first part of our dropdown part
    let dropdown = document.createElement("select");
    dropdown.classList.add("edge_hind_dropdown");
    dropdown.innerHTML = `
        <option value = "Edge">Edge</option>
        <option value = "Hindrance">Hindrance</option>
    `;

    // This is the description for our edge/hind
    let input = document.createElement("input");
    input.classList.add("edge_hind_input");
    input.type = "text";
    input.placeholder = "Enter description";

    // Now we do a remove button just in case we need to replace one
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove_button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function() {
        row.remove();
    });

    row.appendChild(dropdown);
    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
});