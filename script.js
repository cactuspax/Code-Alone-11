// Name: Paxton Robertson
// Desc: Script for swapping between channels and sending data in channels on the webpage 


// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};


//**************************
// FUNCTION
// BREAK (For my sanity)
//**************************

function initalizeEventListeners() {
  document.querySelectorAll(".channel").forEach((button) => {
    button.addEventListener("click", changingChannel);
  });

  // find send button on chat form and adds click event listener
  document.querySelector("#chat-form > button").addEventListener("click", sendMessage);

}

initalizeEventListeners();


//**************************
// FUNCTION
// BREAK (For my sanity)
//**************************

function populateMessages(channel) {
  // remove the message elements
  document.querySelector("#chat-messages").replaceChildren();

  // loops through array to bring in messages in chat

  const template = document.querySelector("template");

  for (let message of chatData[channel]) {
    let newTemplate = document.importNode(template.content, true); //imports all content from template
    let messageElement = newTemplate.querySelector(".message"); // defining this message element once so code is less repeatative

    messageElement.querySelector(".text").textContent = message.text; // set text of message
    messageElement.querySelector(".sender").textContent = message.sender; // set sender of message

    if (message.fromSelf) {
      messageElement.classList.add("self"); // if message is from self - add self to class so it will get special CSS
    }

    document.querySelector("#chat-messages").appendChild(newTemplate); // append to chat messages section
  }
}


//**************************
// FUNCTION
// BREAK (For my sanity)
//**************************

function changingChannel(event) {
  // finds the channel button that is active and removes active fromt the class
  document.querySelector(".channel.active")?.classList.remove("active");

  // captures which button is pressed using currentTarget
  let buttonClicked = event.currentTarget;
  buttonClicked.classList.add("active"); // adds active to the class of button pressed

  // sets text content of header to the name of the chat
  document.getElementById("channel-title").textContent = buttonClicked.textContent;

  populateMessages(buttonClicked.dataset.channel); // calls function to populate the new channels messages

}

//**************************
// FUNCTION
// BREAK (For my sanity)
//**************************

// sets the type to submit so the use can click send OR press enter to send message



function sendMessage() {
  let channel = document.querySelector(".channel.active").dataset.channel;
  let newMessage = document.querySelector("#message-input");
  let text = newMessage.value.trim();

  chatData[channel].push({
    sender: "You",
    text: text,
    fromSelf: true,
  });

  populateMessages(channel);
  newMessage.value = "";
  newMessage.focus();

}

// take in new event

// add message to appropriate chat array object

// create new message element

// append new message element
// Make sure both the message window and the `chatData` object are updated.


