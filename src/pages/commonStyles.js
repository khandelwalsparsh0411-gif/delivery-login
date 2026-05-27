const commonStyles = {

  page:{
    minHeight:"100vh",
    background:"#020617",
    padding:"50px",
    position:"relative",
    overflow:"hidden"
  },

  blur:{
    width:"350px",
    height:"350px",
    background:"#2563eb",
    borderRadius:"50%",
    filter:"blur(160px)",
    position:"absolute",
    top:"-100px",
    left:"-100px",
    opacity:0.5
  },

  container:{
    display:"flex",
    justifyContent:"space-between",
    gap:"40px",
    flexWrap:"wrap",
    position:"relative",
    zIndex:2
  },

  left:{
    flex:1,
    minWidth:"300px"
  },

  right:{
    flex:1,
    minWidth:"320px"
  },

  title:{
    fontSize:"70px",
    color:"white",
    marginBottom:"20px",
    fontWeight:"800"
  },

  subtitle:{
    color:"#94a3b8",
    fontSize:"20px"
  },

  card:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"25px",
    padding:"25px",
    marginBottom:"20px",
    color:"white",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    backdropFilter:"blur(18px)"
  },

  status:{
    padding:"12px 18px",
    borderRadius:"14px",
    background:"#2563eb",
    color:"white"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:"25px",
    position:"relative",
    zIndex:2
  },

  userCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"28px",
    padding:"30px",
    color:"white",
    textAlign:"center",
    backdropFilter:"blur(18px)"
  },

  revenueCard:{
    width:"100%",
    maxWidth:"450px",
    margin:"auto",
    padding:"40px",
    borderRadius:"30px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    color:"white",
    textAlign:"center",
    backdropFilter:"blur(18px)",
    position:"relative",
    zIndex:2
  },

  analyticsCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"28px",
    padding:"35px",
    color:"white",
    backdropFilter:"blur(18px)"
  },

  orderCard:{
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"28px",
    padding:"30px",
    color:"white",
    backdropFilter:"blur(18px)"
  },

  bigText:{
    fontSize:"55px",
    marginTop:"20px",
    marginBottom:"10px"
  }

};

export default commonStyles;