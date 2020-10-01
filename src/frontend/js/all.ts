import initChenMoving from "./moving"
import $ from "jquery"

import "../css/main.scss"

/**
 * Base variables
 */

/**
 * Array with the list of avatars from Ran and Chen
 */
const avatars = [
  "assets/images/avatar/ran/avatar1.png",
  "assets/images/avatar/ran/avatar2.png",
  "assets/images/avatar/ran/avatar3.png",
  "assets/images/avatar/ran/avatar4.png",
  "assets/images/avatar/ran/avatar5.png",
  "assets/images/avatar/ran/avatar6.png",
  "assets/images/avatar/ran/avatar7.png",
  "assets/images/avatar/ran/avatar8.png",
  "assets/images/avatar/ran/avatar9.png",
  "assets/images/avatar/ran/avatar10.png",
  "assets/images/avatar/chen/avatar1.png",
  "assets/images/avatar/chen/avatar2.png",
  "assets/images/avatar/chen/avatar3.png",
  "assets/images/avatar/chen/avatar4.png",
  "assets/images/avatar/chen/avatar5.png",
  "assets/images/avatar/chen/avatar6.png",
  "assets/images/avatar/chen/avatar7.png",
  "assets/images/avatar/chen/avatar8.png",
  "assets/images/avatar/chen/avatar9.png",
  "assets/images/avatar/chen/avatar10.png",
]

/**
 * How many times has been the name clicked
 */
let nameClicked = 0

/**
 * If Chen is currently running
 */
var running = false

/**
 * If the running is infinite
 */
var repeatRun = false

/**
 * Function that enables Chen Controlling
 * on three executions. Executed by clicking the name.
 */
const honkHonk = () => {
  if (nameClicked !== 3) return nameClicked++
  else {
    if (repeatRun) return

    nameClicked = 99
    alert("honk honk")
    initChenMoving()
  }
}

/**
 * Chen honk
 * TODO: Cleanup
 */
const chenHonk = () => {
  if (nameClicked === 99) return
  if (running == true) return

  const honk = () => {
    running = true
    if (
      $(".honk").attr("style") ==
      "transition: right 1s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;"
    ) {
      //if ready to travel to left
      //console.log("gotoleft")
      $(".honk").attr(
        "style",
        "transition: right 1s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;"
      )
    } else if (
      $(".honk").attr("style") ==
      "transition: left 1s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;"
    ) {
      // if ready to travel to right
      //console.log("gotoright")
      $(".honk").attr(
        "style",
        "transition: left 1s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;"
      )
    } //else console.log("failed first if check");

    setTimeout(function () {
      // transition, left/right, transform, rotate
      //console.log($(".honk").attr("style"));
      if (
        $(".honk").attr("style") ==
        "transition: right 1s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;"
      ) {
        // if chen just ran from the bottom right side
        //console.log("came from right")
        $(".honk").attr(
          "style",
          "transition: right 0s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: unset; bottom: -50px;"
        )
        $(".honk").attr(
          "style",
          "transition: left 0s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: unset; bottom: -50px;"
        )
        $(".honk").attr(
          "style",
          "transition: left 1s linear; left: -30%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;"
        )
      } else if (
        $(".honk").attr("style") ==
        "transition: left 1s linear; left: 140%; transform: scale(0.4) rotate(180deg); top: 0px; bottom: unset;"
      ) {
        // if chen just ran from the top left side
        //console.log("came from left")
        $(".honk").attr(
          "style",
          "transition: left 0s linear; right: 140%; transform: scale(0.4) rotate(0deg); top: 0px; bottom: unset;"
        )
        $(".honk").attr(
          "style",
          "transition: right 0s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: 0px; bottom: unset;"
        )
        $(".honk").attr(
          "style",
          "transition: right 1s linear; right: -30%; transform: scale(0.4) rotate(0deg); top: unset; bottom: -50px;"
        )
      } else {
        //console.log("failed if check");
        //console.log($(".honk").attr("style"));
      }
      running = false
    }, 1000)
  }

  if (repeatRun) setInterval(honk, 1050)
  else honk()
}

const changeAvatarImage = () => {
  $(".avatarnormal").attr(
    "src",
    avatars[Math.floor(Math.random() * avatars.length)]
  )
}

/**
 * Page load
 */
$(() => {
  // Hide the body as the first thing on load so it can actually fade in
  $("body").hide()

  // Pick a random avatar and change it before the page fades in
  changeAvatarImage()

  // Fade-in the page content
  $("body").fadeIn(1000)

  $(".avatar").on("click", (e) => {
    // If the name wasn't clicked three times already
    if (!(nameClicked >= 3)) {
      if (e.shiftKey) repeatRun = true // enable infinite running
      setTimeout(chenHonk, 10)
    }

    changeAvatarImage()
  })

  let menuOpen = false

  $(".mobile-menu-button").on("click", function () {
    menuOpen = !menuOpen

    $(".mobile-menu-links").slideToggle(200)
  })
})
