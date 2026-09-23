import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// ======================================================
// LOADING
// ======================================================

let progress = 0;

const progressBar =
  document.getElementById("progressBar");

const loadingText =
  document.getElementById("loadingText");


const loading = setInterval(() => {

  progress++;

  if (progressBar) {
    progressBar.style.width =
      progress + "%";
  }

  if (loadingText) {
    loadingText.innerText =
      progress + "%";
  }


  if (progress >= 100) {

    clearInterval(loading);

    setTimeout(() => {

      showPage("welcomePage");

    }, 500);

  }

}, 30);


// ======================================================
// เปลี่ยนหน้า
// ======================================================

function showPage(pageID) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(page => {

    page.classList.remove("active");

  });


  const targetPage =
    document.getElementById(pageID);


  if (targetPage) {

    targetPage.classList.add("active");

  }

}


// ======================================================
// จำนวนวันที่คบกัน
// ======================================================

// วันที่เริ่มคบ
const startDate =
  new Date("2025-06-10");


const today =
  new Date();


const difference =
  today - startDate;


const days =
  Math.floor(
    difference /
    (1000 * 60 * 60 * 24)
  );


const daysElement =
  document.getElementById("days");


if (daysElement) {

  daysElement.innerText =
    days;

}

// ======================================================
// ปุ่ม "ไม่รัก" วิ่งหนี
// ======================================================

const noButton =
  document.getElementById("noButton");


function moveNoButton() {

  if (!noButton) return;

  const maxX =
    Math.max(0, window.innerWidth - 150);

  const maxY =
    Math.max(0, window.innerHeight - 80);


  const x =
    Math.random() * maxX;

  const y =
    Math.random() * maxY;


  noButton.style.position = "fixed";
  noButton.style.left = x + "px";
  noButton.style.top = y + "px";
}


if (noButton) {

  noButton.addEventListener(
    "mouseenter",
    moveNoButton
  );

  noButton.addEventListener(
    "click",
    moveNoButton
  );

  noButton.addEventListener(
    "touchstart",
    moveNoButton,
    { passive: true }
  );

}


// ======================================================
// กด "รัก"
// ======================================================

function loveAnswer() {

  showPage("finalPage");

  startTyping();

}


// ======================================================
// ข้อความพิมพ์ทีละตัว
// ======================================================

const message =
`ขอโทษน้า..ที่ดีที่สุดไม่ได้

รูปก็ไม่ค่อยจะถ่าย
เลยทำนี่มาแทนแต่เค้าทำนานมากเลยน้าา..

อาจจะไม่ได้สมบูรณ์แบบที่สุด
แต่เค้าตั้งใจทำมันให้เธอจริง ๆ

ขอบคุณสำหรับทุกวันที่อยู่ด้วยกันนะ 
รักนะคั้บ❤️`
;


let textIndex = 0;
let typingTimer = null;


function startTyping() {

  const text =
    document.getElementById("typeText");


  if (!text) return;


  if (typingTimer) {

    clearInterval(typingTimer);

  }


  text.innerHTML = "";

  textIndex = 0;


  typingTimer =
    setInterval(() => {

      text.innerHTML +=
        message.charAt(textIndex);

      textIndex++;


      if (
        textIndex >=
        message.length
      ) {

        clearInterval(typingTimer);

        typingTimer = null;

      }

    }, 45);

}


// ======================================================
// Surprise สุดท้าย + เปิดเพลง
// ======================================================

function finalSurprise() {

  showPage("particle3DPage");


  const music =
    document.getElementById("loveMusic");


  if (music) {

    music.volume = 0;


    music.play()
      .then(() => {

        let volume = 0;


        const fadeMusic =
          setInterval(() => {

            volume += 0.02;


            if (volume >= 0.5) {

              volume = 0.5;

              clearInterval(
                fadeMusic
              );

            }


            music.volume =
              volume;

          }, 80);

      })
      .catch(error => {

        console.log(
          "ยังเปิดเพลงอัตโนมัติไม่ได้:",
          error
        );

      });

  }


  setTimeout(() => {

    startParticle3D();

  }, 100);

}


// ======================================================
// หัวใจลอย
// ======================================================

function createHeart() {

  const heart =
    document.createElement("div");


  heart.classList.add(
    "floating-heart"
  );


  const hearts = [
    "❤️",
    "💗",
    "💕",
    "💖",
    "💘"
  ];


  heart.innerText =
    hearts[
      Math.floor(
        Math.random() *
        hearts.length
      )
    ];


  heart.style.left =
    Math.random() * 100 + "vw";


  heart.style.fontSize =
    (
      20 +
      Math.random() * 30
    ) + "px";


  document.body.appendChild(
    heart
  );


  setTimeout(() => {

    heart.remove();

  }, 5000);

}


// ======================================================
// PIN PASSWORD
// ======================================================

// เปลี่ยนรหัสตรงนี้
const correctPIN = "100626";

let enteredPIN = "";


function pressNumber(number) {

  if (
    enteredPIN.length >= 6
  ) {
    return;
  }


  enteredPIN += number;

  updatePinDots();


  if (
    enteredPIN.length === 6
  ) {

    setTimeout(
      checkPIN,
      250
    );

  }

}


function deleteNumber() {

  enteredPIN =
    enteredPIN.slice(
      0,
      -1
    );


  updatePinDots();


  const pinMessage =
    document.getElementById(
      "pinMessage"
    );


  if (pinMessage) {

    pinMessage.innerText = "";

  }

}


function updatePinDots() {

  const dots =
    document.querySelectorAll(
      ".pin-dot"
    );


  dots.forEach(
    (dot, index) => {

      if (
        index <
        enteredPIN.length
      ) {

        dot.classList.add(
          "filled"
        );

      } else {

        dot.classList.remove(
          "filled"
        );

      }

    }
  );

}


function checkPIN() {

  const pinMessage =
    document.getElementById(
      "pinMessage"
    );


  const card =
    document.querySelector(
      ".password-card"
    );


  if (
    enteredPIN ===
    correctPIN
  ) {

    if (pinMessage) {

      pinMessage.style.color =
        "#2bff3c";

      pinMessage.innerText =
        "รหัสถูกต้อง ❤️";

    }


    setTimeout(() => {

      showPage("storyPage");

    }, 800);

  } else {

    if (pinMessage) {

      pinMessage.style.color =
        "#ff4343";

      pinMessage.innerText =
        "อีกทีนะบี๋ ❤️";

    }


    if (card) {

      card.classList.add(
        "shake"
      );


      setTimeout(() => {

        card.classList.remove(
          "shake"
        );

      }, 400);

    }


    enteredPIN = "";

    updatePinDots();

  }

}
// ======================================================
// HIGHLIGHT 3D PARTICLE
// ======================================================

// รูปทั้งหมด
const particleImages = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg"
];


// ======================================================
// ตัวแปรระบบ 3D
// ======================================================

let scene3D;
let camera3D;
let renderer3D;
let particleGroup3D;
let particlePoints3D;

let particle3DStarted = false;


// ข้อมูล Particle ของแต่ละรูป
let particleImageData = [];


// ตำแหน่งหัวใจ
let hiddenPositions = null;
let hiddenColors = null;


// ระบบลาก
let isDragging3D = false;
let dragStartX = 0;


// ระบบหมุน / Snap
let rotationAmount = 0;
let objectRotationY = 0;

let photoLocked = false;

// -1 = ยังไม่เคยเปิดรูป
let currentPhotoIndex = -1;

let isSnapping = false;


// ======================================================
// เริ่มระบบ 3D
// ======================================================

function startParticle3D() {

  // ป้องกันการสร้าง Canvas ซ้ำ
  if (particle3DStarted) {

    return;

  }


  const container =
    document.getElementById(
      "particle3DContainer"
    );


  if (!container) {

    console.error(
      "ไม่พบ particle3DContainer"
    );

    return;

  }


  particle3DStarted = true;


  // ====================================================
  // Scene
  // ====================================================

  scene3D =
    new THREE.Scene();


  // ====================================================
  // Camera
  // ====================================================

  camera3D =
    new THREE.PerspectiveCamera(

      60,

      window.innerWidth /
      window.innerHeight,

      0.1,

      1000

    );


  camera3D.position.z = 7;


  // ====================================================
  // Renderer
  // ====================================================

  renderer3D =
    new THREE.WebGLRenderer({

      antialias: true,

      alpha: true

    });


  renderer3D.setSize(

    window.innerWidth,

    window.innerHeight

  );


  renderer3D.setPixelRatio(

    Math.min(

      window.devicePixelRatio,

      2

    )

  );


  // พื้นหลังโปร่งใส
  renderer3D.setClearColor(
    0x000000,
    0
  );


  container.innerHTML = "";


  container.appendChild(
    renderer3D.domElement
  );


  // ====================================================
  // กลุ่ม Particle
  // ====================================================

  particleGroup3D =
    new THREE.Group();


  scene3D.add(
    particleGroup3D
  );


  // ====================================================
  // โหลดรูป
  // ====================================================

  loadParticleImages();


  // ====================================================
  // ระบบลาก
  // ====================================================

  setupParticleControls();


  // ====================================================
  // Render Loop
  // ====================================================

  animateParticle3D();

}


// ======================================================
// โหลดรูปทั้งหมด
// ======================================================

async function loadParticleImages() {

  particleImageData = [];


  for (
    const imagePath
    of particleImages
  ) {

    try {

      const data =
        await convertImageToParticles(
          imagePath
        );


      particleImageData.push(
        data
      );


      console.log(
        "✅ โหลดสำเร็จ:",
        imagePath
      );

    } catch (error) {

      console.error(
        "❌ โหลดรูปไม่ได้:",
        imagePath,
        error
      );

    }

  }


  // ไม่มีรูปเลย
  if (
    particleImageData.length === 0
  ) {

    console.error(
      "ไม่มีรูปที่โหลดสำเร็จ"
    );

    return;

  }


  // โหลดครบแล้ว
  // เริ่มต้นด้วยหัวใจ
  createInitialParticleImage();

}


// ======================================================
// แปลงรูปภาพเป็นข้อมูล Particle
// ======================================================

function convertImageToParticles(
  imagePath
) {

  return new Promise(
    (resolve, reject) => {


      const image =
        new Image();


      image.onload =
        function() {


          // ============================================
          // Canvas ชั่วคราว
          // ============================================

          const canvas =
            document.createElement(
              "canvas"
            );


          const ctx =
            canvas.getContext(
              "2d",
              {
                willReadFrequently: true
              }
            );


          if (!ctx) {

            reject(
              new Error(
                "สร้าง Canvas ไม่สำเร็จ"
              )
            );

            return;

          }


          // ============================================
          // ความละเอียด Particle
          // ============================================

          const width = 110;

          const height = 150;


          canvas.width =
            width;

          canvas.height =
            height;


          // ============================================
          // ทำภาพแบบ object-fit: cover
          // ============================================

          const imageRatio =
            image.width /
            image.height;


          const canvasRatio =
            width /
            height;


          let drawWidth;
          let drawHeight;

          let offsetX;
          let offsetY;


          if (
            imageRatio >
            canvasRatio
          ) {

            drawHeight =
              height;


            drawWidth =
              height *
              imageRatio;


            offsetX =
              (
                width -
                drawWidth
              ) / 2;


            offsetY = 0;

          } else {

            drawWidth =
              width;


            drawHeight =
              width /
              imageRatio;


            offsetX = 0;


            offsetY =
              (
                height -
                drawHeight
              ) / 2;

          }


          // ============================================
          // วาดรูปลง Canvas
          // ============================================

          ctx.clearRect(
            0,
            0,
            width,
            height
          );


          ctx.drawImage(

            image,

            offsetX,

            offsetY,

            drawWidth,

            drawHeight

          );


          // ============================================
          // อ่าน Pixel
          // ============================================

          const imageData =
            ctx.getImageData(

              0,

              0,

              width,

              height

            );


          const pixels =
            imageData.data;


          // 110 × 150
          // = 16,500 Particle
          const particleCount =
            width *
            height;


          const positions =
            new Float32Array(
              particleCount * 3
            );


          const colors =
            new Float32Array(
              particleCount * 3
            );


          let particleIndex = 0;


          // ============================================
          // สร้างตำแหน่ง Particle
          // ============================================

          for (
            let y = 0;
            y < height;
            y++
          ) {

            for (
              let x = 0;
              x < width;
              x++
            ) {


              const pixelIndex =
                (
                  y *
                  width +
                  x
                ) * 4;


              const red =
                pixels[
                  pixelIndex
                ];


              const green =
                pixels[
                  pixelIndex + 1
                ];


              const blue =
                pixels[
                  pixelIndex + 2
                ];


              // ========================================
              // ตำแหน่ง X / Y
              // ========================================

              const px =
                (
                  x -
                  width / 2
                ) * 0.035;


              const py =
                -(
                  y -
                  height / 2
                ) * 0.035;


              // ========================================
              // ความลึกเล็กน้อย
              // ========================================

              const brightness =
                (
                  red +
                  green +
                  blue
                ) / 3;


              const pz =
                (
                  brightness -
                  128
                ) /
                255 *
                0.22;


              const i =
                particleIndex * 3;


              positions[i] =
                px;


              positions[i + 1] =
                py;


              positions[i + 2] =
                pz;


              // ========================================
              // สี Particle
              // ========================================

              colors[i] =
                red / 255;


              colors[i + 1] =
                green / 255;


              colors[i + 2] =
                blue / 255;


              particleIndex++;

            }

          }


          resolve({

            positions,

            colors

          });

        };


      // ================================================
      // โหลดรูปไม่สำเร็จ
      // ================================================

      image.onerror =
        function() {

          reject(

            new Error(
              "หารูปไม่เจอ: " +
              imagePath
            )

          );

        };


      image.src =
        imagePath;

    }
  );

}
// ======================================================
// สร้าง Particle เริ่มต้นเป็นรูปหัวใจ
// ======================================================

function createInitialParticleImage() {

  const firstImage =
    particleImageData[0];


  if (!firstImage) {

    console.error(
      "ไม่มีข้อมูลรูปสำหรับสร้าง Particle"
    );

    return;

  }


  const count =
    firstImage.positions.length / 3;


  // ====================================================
  // สร้าง Array สำหรับหัวใจ
  // ====================================================

  hiddenPositions =
    new Float32Array(
      firstImage.positions.length
    );


  hiddenColors =
    new Float32Array(
      firstImage.colors.length
    );


  // ====================================================
  // สร้างตำแหน่งรูปหัวใจ
  // ====================================================

  for (
    let p = 0;
    p < count;
    p++
  ) {

    const i =
      p * 3;


    // มุมสุ่ม
    const t =
      Math.random() *
      Math.PI *
      2;


    // สูตรหัวใจ
    let x =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    let y =
      13 *
      Math.cos(t) -

      5 *
      Math.cos(
        2 * t
      ) -

      2 *
      Math.cos(
        3 * t
      ) -

      Math.cos(
        4 * t
      );


    // ทำให้ Particle
    // กระจายเต็มด้านในหัวใจ
    const fill =
      Math.sqrt(
        Math.random()
      );


    x *= fill;

    y *= fill;


    // ลดขนาดหัวใจ
    x *= 0.11;

    y *= 0.11;


    // เพิ่มความหนา 3D
    const z =
      (
        Math.random() -
        0.5
      ) * 0.8;


    hiddenPositions[i] =
      x;


    hiddenPositions[i + 1] =
      y;


    hiddenPositions[i + 2] =
      z;


    // ==================================================
    // สีแดง / ชมพู
    // ==================================================

    const random =
      Math.random();


    hiddenColors[i] =
      0.85 +
      random * 0.15;


    hiddenColors[i + 1] =
      0.03 +
      random * 0.15;


    hiddenColors[i + 2] =
      0.20 +
      random * 0.25;

  }


  // ====================================================
  // Geometry
  // ====================================================

  const geometry =
    new THREE.BufferGeometry();


  geometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

      hiddenPositions.slice(),

      3

    )

  );


  geometry.setAttribute(

    "color",

    new THREE.BufferAttribute(

      hiddenColors.slice(),

      3

    )

  );


  // ====================================================
  // Material
  // ====================================================

  const material =
    new THREE.PointsMaterial({

      size: 0.026,

      vertexColors: true,

      transparent: true,

      opacity: 0.96,

      depthWrite: true,

      sizeAttenuation: true

    });


  // ====================================================
  // Points
  // ====================================================

  particlePoints3D =
    new THREE.Points(

      geometry,

      material

    );


  particleGroup3D.add(
    particlePoints3D
  );


  // เริ่มจากหัวใจ
  photoLocked = false;

  currentPhotoIndex = -1;

  rotationAmount = 0;

  objectRotationY = 0;


  particleGroup3D.rotation.set(
    0,
    0,
    0
  );


  console.log(
    "❤️ Heart Particle พร้อม:",
    count,
    "จุด"
  );

}


// ======================================================
// Smooth Step
// ทำให้การเปลี่ยนรูปไม่แข็ง
// ======================================================

function smoothStep(value) {

  value =
    Math.max(
      0,
      Math.min(
        1,
        value
      )
    );


  return (
    value *
    value *
    (
      3 -
      2 * value
    )
  );

}


// ======================================================
// Morph Particle
//
// fromPositions = จุดเริ่มต้น
// toPositions   = จุดปลายทาง
//
// fromColors = สีเริ่มต้น
// toColors   = สีปลายทาง
// ======================================================

function morphParticleStates(

  fromPositions,

  fromColors,

  toPositions,

  toColors,

  progress

) {

  if (!particlePoints3D) {

    return;

  }


  const positionAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "position"
      );


  const colorAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "color"
      );


  const positions =
    positionAttribute.array;


  const colors =
    colorAttribute.array;


  const smooth =
    smoothStep(
      progress
    );


  // ตอนกลางของ Transition
  // จะกระจายแรงที่สุด
  const scatter =
    Math.sin(
      smooth *
      Math.PI
    );


  // ====================================================
  // เปลี่ยน Particle ทีละเม็ด
  // ====================================================

  for (
    let i = 0;
    i < positions.length;
    i += 3
  ) {

    const particleNumber =
      i / 3;


    // ==================================================
    // ตำแหน่งปกติระหว่าง A -> B
    // ==================================================

    const targetX =
      fromPositions[i] +
      (
        toPositions[i] -
        fromPositions[i]
      ) *
      smooth;


    const targetY =
      fromPositions[i + 1] +
      (
        toPositions[i + 1] -
        fromPositions[i + 1]
      ) *
      smooth;


    const targetZ =
      fromPositions[i + 2] +
      (
        toPositions[i + 2] -
        fromPositions[i + 2]
      ) *
      smooth;


    // ==================================================
    // หมุน Particle ระหว่างเปลี่ยนรูป
    // ==================================================

    const seed =
      particleNumber *
      0.61803398875;


    const angle =
      seed +

      smooth *
      Math.PI *
      4;


    const radius =
      0.15 +
      (
        (
          particleNumber %
          29
        ) / 29
      ) *
      1.15;


    // หมุนรอบ
    const swirlX =
      Math.cos(
        angle
      ) *
      radius *
      scatter;


    const swirlY =
      Math.sin(
        angle * 1.13
      ) *
      radius *
      scatter;


    // วิ่งเข้า/ออกด้านหน้า
    const swirlZ =
      Math.sin(
        angle * 0.73
      ) *
      1.5 *
      scatter;


    positions[i] =
      targetX +
      swirlX;


    positions[i + 1] =
      targetY +
      swirlY;


    positions[i + 2] =
      targetZ +
      swirlZ;


    // ==================================================
    // เปลี่ยนสี
    // ==================================================

    colors[i] =
      fromColors[i] +
      (
        toColors[i] -
        fromColors[i]
      ) *
      smooth;


    colors[i + 1] =
      fromColors[i + 1] +
      (
        toColors[i + 1] -
        fromColors[i + 1]
      ) *
      smooth;


    colors[i + 2] =
      fromColors[i + 2] +
      (
        toColors[i + 2] -
        fromColors[i + 2]
      ) *
      smooth;

  }


  positionAttribute.needsUpdate =
    true;


  colorAttribute.needsUpdate =
    true;

}


// ======================================================
// หารูปถัดไป
// ======================================================

function getNextPhotoIndex() {

  if (
    particleImageData.length === 0
  ) {

    return 0;

  }


  // ยังไม่เคยเปิดรูป
  // เริ่ม photo1
  if (
    currentPhotoIndex < 0
  ) {

    return 0;

  }


  // รูปถัดไป
  return (
    currentPhotoIndex + 1
  ) %
  particleImageData.length;

}


// ======================================================
// หัวใจ -> รูป
// ======================================================

function morphHeartToPhoto(
  photoIndex,
  progress
) {

  const photo =
    particleImageData[
      photoIndex
    ];


  if (
    !photo ||
    !hiddenPositions ||
    !hiddenColors
  ) {

    return;

  }


  morphParticleStates(

    hiddenPositions,

    hiddenColors,

    photo.positions,

    photo.colors,

    progress

  );

}


// ======================================================
// รูป -> หัวใจ
// ======================================================

function morphPhotoToHeart(
  photoIndex,
  progress
) {

  const photo =
    particleImageData[
      photoIndex
    ];


  if (
    !photo ||
    !hiddenPositions ||
    !hiddenColors
  ) {

    return;

  }


  morphParticleStates(

    photo.positions,

    photo.colors,

    hiddenPositions,

    hiddenColors,

    progress

  );

}
// ======================================================
// ระบบควบคุม Particle ด้วยเมาส์ / นิ้ว
// ======================================================

function setupParticleControls() {

  if (!renderer3D) return;


  const canvas =
    renderer3D.domElement;


  // ระยะลากที่ถือว่า "ผ่าน"
  const triggerDistance = 130;


  // ====================================================
  // เริ่มลาก
  // ====================================================

  canvas.addEventListener(
    "pointerdown",
    (event) => {

      if (isSnapping) return;


      isDragging3D = true;

      dragStartX =
        event.clientX;


      rotationAmount = 0;


      canvas.setPointerCapture(
        event.pointerId
      );


      // ซ่อนข้อความแนะนำ
      const guide =
        document.querySelector(
          ".particle3DGuide"
        );


      if (guide) {

        guide.classList.add(
          "hide"
        );

      }

    }
  );


  // ====================================================
  // กำลังลาก
  // ====================================================

  canvas.addEventListener(
    "pointermove",
    (event) => {

      if (
        !isDragging3D ||
        isSnapping
      ) {

        return;

      }


      const deltaX =
        event.clientX -
        dragStartX;


      rotationAmount =
        deltaX;


      // ================================================
      // Progress 0 - 1
      // ================================================

      const progress =
        Math.min(

          Math.abs(deltaX) /
          260,

          1

        );


      // ================================================
      // ทิศทางการหมุน
      // ================================================

      const direction =
        deltaX >= 0
          ? 1
          : -1;


      objectRotationY =
        direction *
        progress *
        Math.PI *
        1.25;


      if (particleGroup3D) {

        particleGroup3D.rotation.y =
          objectRotationY;

      }


      // ================================================
      // ถ้าตอนนี้เป็นรูป
      // รูป -> หัวใจ
      // ================================================

      if (
        photoLocked &&
        currentPhotoIndex >= 0
      ) {

        morphPhotoToHeart(

          currentPhotoIndex,

          progress

        );

      }


      // ================================================
      // ถ้าตอนนี้เป็นหัวใจ
      // หัวใจ -> รูปถัดไป
      // ================================================

      else {

        const nextPhoto =
          getNextPhotoIndex();


        morphHeartToPhoto(

          nextPhoto,

          progress

        );

      }

    }
  );


  // ====================================================
  // ปล่อยเมาส์ / ปล่อยนิ้ว
  // ====================================================

  canvas.addEventListener(
    "pointerup",
    (event) => {

      if (!isDragging3D) {

        return;

      }


      isDragging3D = false;


      try {

        canvas.releasePointerCapture(
          event.pointerId
        );

      } catch (error) {

        // ไม่ต้องทำอะไร
      }


      // ================================================
      // ลากไกลพอ
      // ================================================

      if (
        Math.abs(rotationAmount) >=
        triggerDistance
      ) {

        finishRotation(true);

      }


      // ================================================
      // ลากไม่ถึง
      // กลับสภาพเดิม
      // ================================================

      else {

        finishRotation(false);

      }

    }
  );


  // ====================================================
  // Pointer ถูกยกเลิก
  // ====================================================

  canvas.addEventListener(
    "pointercancel",
    () => {

      if (!isDragging3D) {

        return;

      }


      isDragging3D = false;


      finishRotation(false);

    }
  );

}


// ======================================================
// ปล่อยแล้วทำ Animation ให้จบ
//
// complete = true
//   ไปยังสถานะใหม่
//
// complete = false
//   กลับสถานะเดิม
// ======================================================

function finishRotation(
  complete
) {

  if (isSnapping) {

    return;

  }


  isSnapping = true;


  // Progress ตอนที่ปล่อย
  const startProgress =
    Math.min(

      Math.abs(rotationAmount) /
      260,

      1

    );


  // ถ้าลากผ่าน
  // ไป 100%
  //
  // ถ้าไม่ผ่าน
  // กลับ 0%
  const endProgress =
    complete
      ? 1
      : 0;


  const startRotation =
    objectRotationY;


  const endRotation =
    complete
      ? (
          rotationAmount >= 0
            ? Math.PI * 2
            : -Math.PI * 2
        )
      : 0;


  const duration =
    complete
      ? 450
      : 300;


  const startTime =
    performance.now();


  // จำว่าตอนเริ่ม
  // เราอยู่ที่รูปหรือหัวใจ
  const startedFromPhoto =
    photoLocked;


  const photoIndex =
    startedFromPhoto

      ? currentPhotoIndex

      : getNextPhotoIndex();


  // ====================================================
  // Animation
  // ====================================================

  function animateSnap(
    currentTime
  ) {

    const elapsed =
      currentTime -
      startTime;


    let t =
      elapsed /
      duration;


    if (t > 1) {

      t = 1;

    }


    // easeOutCubic
    const ease =
      1 -
      Math.pow(
        1 - t,
        3
      );


    const currentProgress =
      startProgress +
      (
        endProgress -
        startProgress
      ) *
      ease;


    const currentRotation =
      startRotation +
      (
        endRotation -
        startRotation
      ) *
      ease;


    // ================================================
    // หมุนวัตถุ
    // ================================================

    if (particleGroup3D) {

      particleGroup3D.rotation.y =
        currentRotation;

    }


    // ================================================
    // รูป -> หัวใจ
    // ================================================

    if (startedFromPhoto) {

      morphPhotoToHeart(

        photoIndex,

        currentProgress

      );

    }


    // ================================================
    // หัวใจ -> รูป
    // ================================================

    else {

      morphHeartToPhoto(

        photoIndex,

        currentProgress

      );

    }


    // ================================================
    // ยัง Animation ไม่เสร็จ
    // ================================================

    if (t < 1) {

      requestAnimationFrame(
        animateSnap
      );

      return;

    }


    // ================================================
    // Animation เสร็จแล้ว
    // ================================================

    if (complete) {


      // ----------------------------------------------
      // เดิมเป็นรูป
      // ตอนนี้ล็อกเป็นหัวใจ
      // ----------------------------------------------

      if (startedFromPhoto) {

        lockToHeart();

      }


      // ----------------------------------------------
      // เดิมเป็นหัวใจ
      // ตอนนี้ล็อกเป็นรูป
      // ----------------------------------------------

      else {

        lockToPhoto(
          photoIndex
        );

      }

    }


    // ================================================
    // ถ้าลากไม่ถึง
    // กลับสภาพเดิม
    // ================================================

    else {


      if (startedFromPhoto) {

        lockToPhoto(
          photoIndex
        );

      } else {

        lockToHeart();

      }

    }


    rotationAmount = 0;

    objectRotationY = 0;

    isSnapping = false;

  }


  requestAnimationFrame(
    animateSnap
  );

}


// ======================================================
// ล็อก Particle ให้เป็นรูป 100%
//
// ตรงนี้สำคัญ:
// ไม่ใช้ค่าจาก Morph
// แต่ Copy ตำแหน่งรูปจริงกลับเข้าไปเลย
// ทำให้ภาพไม่เบี้ยวหลังหมุน
// ======================================================

function lockToPhoto(
  photoIndex
) {

  const photo =
    particleImageData[
      photoIndex
    ];


  if (
    !photo ||
    !particlePoints3D
  ) {

    return;

  }


  const positionAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "position"
      );


  const colorAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "color"
      );


  // ====================================================
  // Copy ตำแหน่งรูปจริง
  // ====================================================

  positionAttribute.array.set(
    photo.positions
  );


  colorAttribute.array.set(
    photo.colors
  );


  positionAttribute.needsUpdate =
    true;


  colorAttribute.needsUpdate =
    true;


  // ====================================================
  // หันรูปตรงเข้ากล้อง
  // ====================================================

  particleGroup3D.rotation.set(
    0,
    0,
    0
  );


  objectRotationY = 0;

  rotationAmount = 0;


  // ====================================================
  // บันทึกสถานะ
  // ====================================================

  photoLocked = true;

  currentPhotoIndex =
    photoIndex;


  console.log(
    "📷 ล็อกรูป:",
    photoIndex + 1
  );


  // ====================================================
  // ถ้าถึงรูปสุดท้าย
  // แสดงข้อความลับ
  // ====================================================

  if (
    photoIndex ===
    particleImageData.length - 1
  ) {

    const secret =
      document.getElementById(
        "particleSecret"
      );


    if (secret) {

      secret.classList.add(
        "show"
      );

    }

  }

}


// ======================================================
// ล็อก Particle ให้กลับเป็นหัวใจ 100%
// ======================================================

function lockToHeart() {

  if (
    !particlePoints3D ||
    !hiddenPositions ||
    !hiddenColors
  ) {

    return;

  }


  const positionAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "position"
      );


  const colorAttribute =
    particlePoints3D
      .geometry
      .getAttribute(
        "color"
      );


  // ====================================================
  // Copy หัวใจจริงกลับเข้าไป
  // ====================================================

  positionAttribute.array.set(
    hiddenPositions
  );


  colorAttribute.array.set(
    hiddenColors
  );


  positionAttribute.needsUpdate =
    true;


  colorAttribute.needsUpdate =
    true;


  // ====================================================
  // หันตรงเข้ากล้อง
  // ====================================================

  particleGroup3D.rotation.set(
    0,
    0,
    0
  );


  objectRotationY = 0;

  rotationAmount = 0;


  // ====================================================
  // สถานะตอนนี้ = หัวใจ
  // ====================================================

  photoLocked = false;


  console.log(
    "❤️ ล็อกกลับเป็นหัวใจ"
  );

}
// ======================================================
// Render Loop
// ทำให้ Three.js วาดภาพต่อเนื่อง
// ======================================================

function animateParticle3D() {

  requestAnimationFrame(
    animateParticle3D
  );


  if (
    !renderer3D ||
    !scene3D ||
    !camera3D
  ) {

    return;

  }


  renderer3D.render(

    scene3D,

    camera3D

  );

}


// ======================================================
// ปรับขนาด 3D ตามหน้าจอ
// ======================================================

function resizeParticle3D() {

  if (
    !camera3D ||
    !renderer3D
  ) {

    return;

  }


  camera3D.aspect =
    window.innerWidth /
    window.innerHeight;


  camera3D.updateProjectionMatrix();


  renderer3D.setSize(

    window.innerWidth,

    window.innerHeight

  );


  renderer3D.setPixelRatio(

    Math.min(

      window.devicePixelRatio,

      2

    )

  );

}


// เมื่อขนาดหน้าจอเปลี่ยน
window.addEventListener(

  "resize",

  resizeParticle3D

);


// ======================================================
// เชื่อมฟังก์ชันเข้ากับ HTML
//
// เพราะ script.js ใช้ type="module"
// ฟังก์ชันจะไม่เข้า window อัตโนมัติ
//
// ถ้า HTML มี onclick="showPage(...)"
// จำเป็นต้องมีส่วนนี้
// ======================================================

window.showPage =
  showPage;


window.pressNumber =
  pressNumber;


window.deleteNumber =
  deleteNumber;


window.loveAnswer =
  loveAnswer;


window.finalSurprise =
  finalSurprise;


window.moveNoButton =
  moveNoButton;


// ======================================================
// DEBUG
// เอาไว้ดูว่า JavaScript โหลดสำเร็จหรือไม่
// ======================================================

console.log(
  "❤️ Romantic Website JavaScript Loaded"
);

console.log(
  "🔐 PIN:",
  correctPIN
);

console.log(
  "📷 จำนวนรูป:",
  particleImages.length
);