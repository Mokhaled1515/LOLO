// import { useEffect, useState } from "react";

// const Carousel = ({ data }) => {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   useEffect(() => {
   
//     const interval = setInterval(() => {
//       setCurrentIndex((prevState) => {
//         if (prevState == data.length - 1) {
//           return (prevState = 0);
//         } else {
//           return prevState + 1;
//         }
//       });

//       return () => {
//         clearInterval(interval);
//       };
//     }, 8000);
//   }, []);

//   return (
//     <div className="carousel-wrapper">
//       {/* <img
//         src={data[currentIndex]}
//         alt={`room-${currentIndex}`}
//         style={{ width: "100%", objectFit: "cover" }}
//       /> */}
//       <img src={data[currentIndex]} alt="" />
//     </div>
//   );
// };

// export default Carousel;



import { useEffect, useState } from "react";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 4000); // تغيير الصورة كل 4 ثواني

    return () => clearInterval(interval);
  }, [data]);

  if (!data || data.length === 0) {
    return <img src="/not-or.png" alt="default" style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img
        src={data[currentIndex]}
        alt={`room-slide-${currentIndex}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease-in-out",
        }}
      />
      
      {/* مؤشرات الصور (Dots) تحت لو حبيت توضح للعميل هو في أنهي صورة */}
      {data.length > 1 && (
        <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
          {data.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: currentIndex === idx ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: currentIndex === idx ? "#ffffff" : "rgba(255,255,255,0.5)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;