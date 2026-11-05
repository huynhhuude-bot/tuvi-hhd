// Module 27469: ScrollIntroModal (Cuộn Thư Cổ Điển HHD)
export const factory27469 = e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(18566);let o=[{name:"Thiên Khu",x:60,y:18},{name:"Thiên Toàn",x:105,y:26},{name:"Thiên Cơ",x:142,y:22},{name:"Thiên Quyền",x:185,y:15},{name:"Ngọc Hoành",x:230,y:19},{name:"Khai Dương",x:275,y:12},{name:"Dao Quang",x:320,y:24}],s=[{badge:"105°Đ · Chân thái dương thời",desc:"Hiệu chỉnh độ lệch kinh độ theo đúng nơi sinh tại 63 tỉnh thành."},{badge:"108 tinh diệu · Tam hợp & Tứ hóa",desc:"Luận giải đa tầng từ gốc Mệnh, Thân đến Đại vận 10 năm và Lưu niên."},{badge:"196 chuyên khảo tinh hệ",desc:"Kết hợp điển tịch cổ thư cùng đối thoại chuyên sâu theo từng câu hỏi riêng."}];e.s(["f",0,function({onComplete:e,skipLabel:n="Thưởng lãm tinh đồ"}){let l=(0,r.useRouter)(),[a,c]=(0,i.useState)(!1),p=(0,i.useRef)(e);return p.current=e,(0,i.useEffect)(()=>{let e=setTimeout(()=>{c(!0)},8200),t=setTimeout(()=>{p.current()},8900);return()=>{clearTimeout(e),clearTimeout(t)}},[]),(0,t.jsxs)("div",{role:"dialog","aria-modal":"true","aria-label":"Chiếu thư Tử Vi mệnh bàn HHD",className:`scroll-stage-root ${a?"is-closing":""}`,style:{position:"fixed",inset:0,zIndex:9999,background:"radial-gradient(ellipse at 50% 45%, #1f150b 0%, #0d0804 65%, #040201 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"16px"},children:[(0,t.jsx)("style",{children:`
        @keyframes scrollStageOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.03); }
        }
        @keyframes scrollParchmentUnroll {
          0% {
            clip-path: inset(0 46% 0 46% round 6px);
            transform: scale(0.94);
          }
          12% {
            clip-path: inset(0 43% 0 43% round 6px);
            transform: scale(0.96);
          }
          78% {
            clip-path: inset(0 0% 0 0% round 6px);
            transform: scale(1.012);
          }
          100% {
            clip-path: inset(0 0% 0 0% round 6px);
            transform: scale(1);
          }
        }
        @keyframes scrollLeftRollerMove {
          0% { left: 46%; }
          12% { left: 43%; }
          78% { left: -6px; }
          100% { left: 0px; }
        }
        @keyframes scrollRightRollerMove {
          0% { right: 46%; }
          12% { right: 43%; }
          78% { right: -6px; }
          100% { right: 0px; }
        }
        @keyframes scrollRiseMask {
          0% { opacity: 0; transform: translateY(18px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scrollSealSlam {
          0% { opacity: 0; transform: scale(2.35) rotate(-22deg); }
          60% { opacity: 1; transform: scale(0.92) rotate(-2deg); }
          82% { opacity: 1; transform: scale(1.06) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(-4deg); }
        }
        @keyframes scrollSealRipple {
          0% { opacity: 0.75; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(1.9); }
        }
        @keyframes scrollLightSweep {
          0% { transform: translateX(-140%) skewX(-24deg); opacity: 0; }
          25% { opacity: 0.55; }
          75% { opacity: 0.55; }
          100% { transform: translateX(220%) skewX(-24deg); opacity: 0; }
        }
        @keyframes scrollSettleCam {
          0% { transform: scale(1); }
          50% { transform: scale(1.012); }
          100% { transform: scale(1); }
        }
        @keyframes scrollProgressLine {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .scroll-stage-root.is-closing {
          animation: scrollStageOut 0.55s cubic-bezier(0.32, 0, 0.67, 0) forwards !important;
        }
        .scroll-parchment-body {
          animation: scrollParchmentUnroll 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
        }
        .scroll-roller-left {
          animation: scrollLeftRollerMove 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
        }
        .scroll-roller-right {
          animation: scrollRightRollerMove 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
        }
        .scroll-cam-hold {
          animation: scrollSettleCam 6s ease-in-out 1.35s infinite !important;
        }
        .scroll-item-1 {
          animation: scrollRiseMask 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both !important;
        }
        .scroll-item-2 {
          animation: scrollRiseMask 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both !important;
        }
        .scroll-item-3 {
          animation: scrollRiseMask 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.52s both !important;
        }
        .scroll-item-4 {
          animation: scrollRiseMask 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.68s both !important;
        }
        .scroll-item-5 {
          animation: scrollRiseMask 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.84s both !important;
        }
        .scroll-seal-slam {
          animation: scrollSealSlam 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.95s both !important;
        }
        .scroll-seal-ring {
          animation: scrollSealRipple 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.15s infinite !important;
        }
        .scroll-title-sweep::after {
          content: '';
          position: absolute;
          top: -10%;
          bottom: -10%;
          left: 0;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255, 248, 220, 0.72), transparent);
          pointer-events: none;
          animation: scrollLightSweep 2.6s ease-in-out 0.9s infinite !important;
        }
      `}),(0,t.jsx)("div",{style:{position:"absolute",inset:0,pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center",opacity:.26},children:(0,t.jsx)("svg",{viewBox:"0 0 600 600",style:{width:"min(92vw, 760px)",height:"min(92vw, 760px)"},children:(0,t.jsxs)("g",{children:[(0,t.jsx)("animateTransform",{attributeName:"transform",type:"rotate",from:"0 300 300",to:"360 300 300",dur:"48s",repeatCount:"indefinite"}),(0,t.jsx)("circle",{cx:"300",cy:"300",r:"275",fill:"none",stroke:"#d4a843",strokeWidth:"1",strokeDasharray:"4 8"}),(0,t.jsx)("circle",{cx:"300",cy:"300",r:"235",fill:"none",stroke:"#d4a843",strokeWidth:"0.7",opacity:"0.6"}),(0,t.jsx)("polygon",{points:"300,35 529,432 71,432",fill:"none",stroke:"#d4a843",strokeWidth:"0.6",opacity:"0.35"}),(0,t.jsx)("polygon",{points:"300,565 529,168 71,168",fill:"none",stroke:"#d4a843",strokeWidth:"0.6",opacity:"0.35"})]})})}),(0,t.jsxs)("div",{className:"scroll-cam-hold",style:{position:"relative",width:"min(95vw, 1120px)",minHeight:"min(78vh, 570px)",display:"flex",alignItems:"stretch",justifyContent:"center"},children:[(0,t.jsxs)("div",{className:"scroll-parchment-body",style:{position:"relative",width:"calc(100% - 44px)",margin:"14px 22px",background:`
              radial-gradient(circle at 50% 45%, rgba(255, 250, 232, 0.72) 0%, rgba(236, 216, 168, 0.4) 55%, rgba(196, 158, 92, 0.35) 100%),
              linear-gradient(135deg, #f5e9ca 0%, #ead6a7 48%, #d9be82 100%)
            `,boxShadow:`
              inset 0 0 70px rgba(120, 74, 18, 0.24),
              inset 0 0 0 2px rgba(138, 92, 24, 0.36),
              0 20px 70px rgba(0, 0, 0, 0.85),
              0 0 90px rgba(212, 168, 67, 0.18)
            `,borderRadius:"6px",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"clamp(20px, 3.2vh, 34px) clamp(24px, 4.5vw, 68px)"},children:[(0,t.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,height:"10px",background:"repeating-linear-gradient(90deg, #6e4511 0px, #6e4511 12px, #b8862d 12px, #b8862d 24px)",opacity:.75}}),(0,t.jsx)("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"10px",background:"repeating-linear-gradient(90deg, #6e4511 0px, #6e4511 12px, #b8862d 12px, #b8862d 24px)",opacity:.75}}),(0,t.jsxs)("svg",{viewBox:"0 0 400 400",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"min(62vw, 420px)",height:"min(62vw, 420px)",opacity:.08,pointerEvents:"none"},children:[(0,t.jsx)("circle",{cx:"200",cy:"200",r:"180",fill:"none",stroke:"#5c3809",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"200",cy:"200",r:"135",fill:"none",stroke:"#5c3809",strokeWidth:"1.2",strokeDasharray:"6 4"}),(0,t.jsx)("circle",{cx:"200",cy:"200",r:"85",fill:"none",stroke:"#5c3809",strokeWidth:"1.5"}),(0,t.jsx)("line",{x1:"20",y1:"200",x2:"380",y2:"200",stroke:"#5c3809",strokeWidth:"1"}),(0,t.jsx)("line",{x1:"200",y1:"20",x2:"200",y2:"380",stroke:"#5c3809",strokeWidth:"1"})]}),(0,t.jsx)("div",{className:"hidden lg:flex flex-col items-center justify-center",style:{position:"absolute",left:"18px",top:"28px",bottom:"28px",width:"34px",border:"1px solid rgba(122, 82, 20, 0.32)",background:"rgba(138, 92, 24, 0.07)",borderRadius:"4px",padding:"10px 4px",color:"#5a390c",fontSize:"11px",fontWeight:700,letterSpacing:"0.16em",writingMode:"vertical-rl",textOrientation:"upright",userSelect:"none"},children:"BẮC ĐẨU XOAY VẦN MỞ LỐI THIÊN CƠ"}),(0,t.jsx)("div",{className:"hidden lg:flex flex-col items-center justify-center",style:{position:"absolute",right:"18px",top:"28px",bottom:"28px",width:"34px",border:"1px solid rgba(122, 82, 20, 0.32)",background:"rgba(138, 92, 24, 0.07)",borderRadius:"4px",padding:"10px 4px",color:"#5a390c",fontSize:"11px",fontWeight:700,letterSpacing:"0.16em",writingMode:"vertical-rl",textOrientation:"upright",userSelect:"none"},children:"NAM TÀO ĐỊNH VỊ SOI MIỀN NHÂN MỆNH"}),(0,t.jsxs)("div",{className:"scroll-item-1 flex flex-col items-center text-center relative z-10",children:[(0,t.jsxs)("svg",{viewBox:"0 0 380 38",style:{width:"min(76vw, 340px)",height:"32px",marginBottom:"2px"},children:[(0,t.jsx)("polyline",{points:o.map(e=>`${e.x},${e.y}`).join(" "),fill:"none",stroke:"#8b5a12",strokeWidth:"1.2",strokeDasharray:"3 3"}),o.map(e=>(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:"3.2",fill:"#9c271f"}),(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:"6",fill:"none",stroke:"#8b5a12",strokeWidth:"0.8",opacity:"0.55"})]},e.name))]}),(0,t.jsx)("div",{style:{fontSize:"clamp(9.5px, 1.05vw, 11.5px)",color:"#6e4510",letterSpacing:"0.26em",fontWeight:600},children:o.map(e=>e.name).join(" · ")})]}),(0,t.jsxs)("div",{className:"flex flex-col items-center text-center relative z-10 my-auto py-2",children:[(0,t.jsx)("div",{className:"scroll-item-2",style:{fontSize:"clamp(11px, 1.25vw, 13.5px)",color:"#8c2219",letterSpacing:"0.24em",fontWeight:700,marginBottom:"6px"},children:"QUAN THIÊN CHI TƯỢNG · SÁT NHÂN CHI MỆNH · TRI HÀNH HỢP NHẤT"}),(0,t.jsx)("div",{className:"scroll-item-2 relative overflow-hidden scroll-title-sweep px-3 py-1",children:(0,t.jsx)("h1",{style:{fontSize:"clamp(32px, 5.2vw, 68px)",fontWeight:800,color:"#1c1105",letterSpacing:"0.08em",lineHeight:1.08,margin:0,textShadow:"0 1px 0 rgba(255, 252, 240, 0.7), 0 4px 18px rgba(120, 74, 15, 0.18)"},children:"Tử Vi mệnh bàn"})}),(0,t.jsx)("div",{className:"scroll-item-3 lg:hidden mt-1.5 mb-1",style:{fontSize:"11px",color:"#6b4411",fontWeight:600,letterSpacing:"0.06em"},children:"Bắc Đẩu xoay vần mở lối thiên cơ · Nam Tào định vị soi miền nhân mệnh"}),(0,t.jsxs)("p",{className:"scroll-item-3",style:{maxWidth:"720px",fontSize:"clamp(12.5px, 1.32vw, 15px)",lineHeight:1.68,color:"#2d1d09",fontWeight:500,marginTop:"10px",marginBottom:"16px"},children:["Giờ sinh lệch một khắc, mệnh bàn sai vạn dặm. Khác với lối an sao đại trà theo giờ đồng hồ hành chính,"," ",(0,t.jsx)("strong",{style:{color:"#7c1d15",fontWeight:700},children:"hệ thống HHD"})," hiệu chỉnh chân thái dương thời theo kinh tuyến thực của từng tỉnh thành Việt Nam, an đủ 108 tinh diệu và đối chiếu trực tiếp 21 chương cổ thư chính tông."]}),(0,t.jsx)("div",{className:"scroll-item-4 grid grid-cols-1 md:grid-cols-3 gap-2.5 w-full",style:{maxWidth:"820px"},children:s.map(e=>(0,t.jsxs)("div",{style:{background:"rgba(255, 250, 236, 0.62)",border:"1px solid rgba(138, 92, 24, 0.34)",borderRadius:"8px",padding:"10px 12px",textAlign:"left",boxShadow:"0 4px 14px rgba(90, 54, 12, 0.08)"},children:[(0,t.jsxs)("div",{style:{fontSize:"11.5px",fontWeight:700,color:"#7c1d15",marginBottom:"3px",letterSpacing:"0.02em"},children:["✦ ",e.badge]}),(0,t.jsx)("div",{style:{fontSize:"11.5px",lineHeight:1.48,color:"#3d280e"},children:e.desc})]},e.badge))})]}),(0,t.jsxs)("div",{className:"scroll-item-5 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-amber-900/20 relative z-10 lg:px-8",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{style:{position:"relative",width:"54px",height:"54px"},children:[(0,t.jsx)("div",{className:"scroll-seal-ring",style:{position:"absolute",inset:0,border:"2px solid rgba(168, 40, 32, 0.55)",borderRadius:"6px",pointerEvents:"none"}}),(0,t.jsxs)("div",{className:"scroll-seal-slam",style:{width:"54px",height:"54px",background:"linear-gradient(135deg, #b82921 0%, #8f1b14 100%)",color:"#f9f1de",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"10px",lineHeight:1.15,letterSpacing:"0.06em",boxShadow:"0 4px 12px rgba(140, 24, 18, 0.45), inset 0 0 0 2px rgba(249, 241, 222, 0.28)"},children:[(0,t.jsxs)("div",{style:{display:"flex",gap:"3px"},children:[(0,t.jsx)("span",{children:"THIÊN"}),(0,t.jsx)("span",{children:"KỶ"})]}),(0,t.jsxs)("div",{style:{display:"flex",gap:"3px"},children:[(0,t.jsx)("span",{children:"ĐẨU"}),(0,t.jsx)("span",{children:"SỐ"})]})]})]}),(0,t.jsxs)("div",{style:{textAlign:"left"},children:[(0,t.jsx)("div",{style:{fontSize:"11px",fontWeight:700,color:"#4a2f0e",letterSpacing:"0.12em"},children:"ẤN CHƯƠNG CHÍNH TÔNG"}),(0,t.jsx)("div",{style:{fontSize:"11px",color:"#6e4918"},children:"☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ · Kinh tuyến 105°Đ"})]})]}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2.5",children:[(0,t.jsx)("button",{type:"button",onClick:()=>{c(!0),setTimeout(()=>{p.current(),l.push("/chart")},350)},style:{padding:"10px 20px",borderRadius:"999px",background:"linear-gradient(135deg, #9e221b 0%, #78150f 100%)",color:"#fff6e3",border:"1px solid rgba(255, 226, 168, 0.45)",fontSize:"12.5px",fontWeight:700,letterSpacing:"0.06em",cursor:"pointer",boxShadow:"0 6px 18px rgba(140, 24, 18, 0.35)"},children:"✦ Khởi lập mệnh bàn"}),(0,t.jsxs)("button",{type:"button",onClick:()=>{a||(c(!0),setTimeout(()=>{p.current()},550))},style:{padding:"10px 18px",borderRadius:"999px",background:"rgba(90, 56, 14, 0.12)",color:"#3b2408",border:"1px solid rgba(90, 56, 14, 0.38)",fontSize:"12.5px",fontWeight:600,letterSpacing:"0.05em",cursor:"pointer"},children:[n," →"]})]})]}),(0,t.jsx)("div",{style:{position:"absolute",bottom:"10px",left:0,right:0,height:"3px",background:"rgba(120, 74, 18, 0.14)",overflow:"hidden"},children:(0,t.jsx)("div",{style:{width:"100%",height:"100%",background:"linear-gradient(90deg, #8f1b14, #c88a28)",transformOrigin:"left center",animation:"scrollProgressLine 8.2s linear forwards"}})})]}),(0,t.jsxs)("div",{className:"scroll-roller-left",style:{position:"absolute",top:0,bottom:0,left:0,width:"28px",background:"linear-gradient(90deg, #3b2309 0%, #7d5116 24%, #d6a34f 50%, #7d5116 76%, #3b2309 100%)",borderRadius:"6px",boxShadow:"4px 10px 28px rgba(0,0,0,0.75), inset 0 0 10px rgba(0,0,0,0.45)",zIndex:20},children:[(0,t.jsx)("div",{style:{position:"absolute",top:"-12px",left:"-5px",right:"-5px",height:"18px",background:"radial-gradient(ellipse at 35% 35%, #f7dca0 0%, #c89647 45%, #5c370f 95%)",borderRadius:"50%",boxShadow:"0 3px 8px rgba(0,0,0,0.6)"}}),(0,t.jsx)("div",{style:{position:"absolute",bottom:"-12px",left:"-5px",right:"-5px",height:"18px",background:"radial-gradient(ellipse at 35% 35%, #f7dca0 0%, #c89647 45%, #5c370f 95%)",borderRadius:"50%",boxShadow:"0 3px 8px rgba(0,0,0,0.6)"}})]}),(0,t.jsxs)("div",{className:"scroll-roller-right",style:{position:"absolute",top:0,bottom:0,right:0,width:"28px",background:"linear-gradient(90deg, #3b2309 0%, #7d5116 24%, #d6a34f 50%, #7d5116 76%, #3b2309 100%)",borderRadius:"6px",boxShadow:"-4px 10px 28px rgba(0,0,0,0.75), inset 0 0 10px rgba(0,0,0,0.45)",zIndex:20},children:[(0,t.jsx)("div",{style:{position:"absolute",top:"-12px",left:"-5px",right:"-5px",height:"18px",background:"radial-gradient(ellipse at 35% 35%, #f7dca0 0%, #c89647 45%, #5c370f 95%)",borderRadius:"50%",boxShadow:"0 3px 8px rgba(0,0,0,0.6)"}}),(0,t.jsx)("div",{style:{position:"absolute",bottom:"-12px",left:"-5px",right:"-5px",height:"18px",background:"radial-gradient(ellipse at 35% 35%, #f7dca0 0%, #c89647 45%, #5c370f 95%)",borderRadius:"50%",boxShadow:"0 3px 8px rgba(0,0,0,0.6)"}})]})]})]})}])};
