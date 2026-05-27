import React, { useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { supabase } from "../supabase";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

// IMPORTANT FIX
window.L = L;

// ROUTING MACHINE
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";

// CUSTOMER ICON
const customerIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",

  iconSize: [40, 40],
});

// DELIVERY ICON
const deliveryIcon = L.divIcon({
  html: `
    <div style="
      font-size:45px;
      animation: bounce 1s infinite;
    ">
      🛵
    </div>
  `,
  className: "",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

// ROUTING COMPONENT
function Routing({
  customerLocation,
  deliveryLocation,
  setEta,
  setDistance,
}) {

  const map = useMap();

  useEffect(() => {

    if (
      !customerLocation ||
      !deliveryLocation
    ) return;

    const routingControl =
      L.Routing.control({

        waypoints: [

          L.latLng(
            deliveryLocation[0],
            deliveryLocation[1]
          ),

          L.latLng(
            customerLocation[0],
            customerLocation[1]
          ),

        ],

        routeWhileDragging: false,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        show: false,

        lineOptions: {
          styles: [
            {
              color: "#38bdf8",
              weight: 6,
            },
          ],
        },

      }).addTo(map);

    routingControl.on(
      "routesfound",
      function (e) {

        const routes =
          e.routes;

        const summary =
          routes[0].summary;

        const distance =
          (
            summary.totalDistance / 1000
          ).toFixed(1);

        const time =
          Math.ceil(
            summary.totalTime / 60
          );

        setEta(
          `${time} mins`
        );

        setDistance(
          `${distance} km`
        );

      }
    );

    return () => {
      map.removeControl(
        routingControl
      );
    };

  }, [
    customerLocation,
    deliveryLocation,
    map,
  ]);

  return null;
}

export default function TrackOrder() {

  // CUSTOMER LOCATION
  const [customerLocation, setCustomerLocation] =
    useState([
      28.6139,
      77.2090,
    ]);

  // DELIVERY LOCATION
  const [deliveryLocation, setDeliveryLocation] =
    useState([
      28.6165,
      77.2167,
    ]);

  // DELIVERY BOY
  const [deliveryBoy, setDeliveryBoy] =
    useState("");

  // ETA
  const [eta, setEta] =
    useState("");

  // DISTANCE
  const [distance, setDistance] =
    useState("");

  // CUSTOMER LIVE LOCATION
  useEffect(() => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const liveLocation = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setCustomerLocation(
          liveLocation
        );

      },

      (error) => {

        console.log(error);

        alert(
          "Please allow location access"
        );

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }

    );

  }, []);

  // REALTIME DELIVERY TRACKING
  useEffect(() => {

    const fetchDeliveryLocation =
      async () => {

        const orderId =
          localStorage.getItem(
            "currentOrderId"
          );

        if (!orderId) return;

        const { data, error } =
          await supabase
            .from("orders")
            .select(`
              delivery_lat,
              delivery_lng,
              assigned_delivery_boy
            `)
            .eq("id", orderId)
            .single();

        if (
          data?.delivery_lat &&
          data?.delivery_lng
        ) {

          setDeliveryLocation([
            data.delivery_lat,
            data.delivery_lng,
          ]);

        }

        // DELIVERY BOY
        if (
          data?.assigned_delivery_boy
        ) {

          setDeliveryBoy(
            data.assigned_delivery_boy
          );

        }

        if (error) {
          console.log(error);
        }

      };

    fetchDeliveryLocation();

    // REALTIME SOCKETS
    const channel = supabase
      .channel("live-location")

      .on(
        "postgres_changes",

        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },

        (payload) => {

          const updatedOrder =
            payload.new;

          if (
            updatedOrder.id ==
            localStorage.getItem(
              "currentOrderId"
            )
          ) {

            const startLat =
              deliveryLocation[0];

            const startLng =
              deliveryLocation[1];

            const endLat =
              updatedOrder.delivery_lat;

            const endLng =
              updatedOrder.delivery_lng;

            let step = 0;

            const totalSteps = 50;

            const animate =
              setInterval(() => {

                step++;

                const newLat =
                  startLat +
                  ((endLat - startLat) *
                    step) /
                    totalSteps;

                const newLng =
                  startLng +
                  ((endLng - startLng) *
                    step) /
                    totalSteps;

                setDeliveryLocation([
                  newLat,
                  newLng,
                ]);

                if (
                  step >= totalSteps
                ) {

                  clearInterval(
                    animate
                  );

                }

              }, 30);

          }

        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [deliveryLocation]);

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <div style={styles.container}>

        {/* LEFT */}

        <div style={styles.left}>

          <h1 style={styles.title}>
            Track Order 📍
          </h1>

          <p style={styles.subtitle}>
            Your order is arriving soon
          </p>

          <div style={styles.statusCard}>

            <FaMotorcycle
              size={45}
              color="#38bdf8"
            />

            <div>

              <h2>
                Delivery Partner
              </h2>

              <p>
                Realtime Tracking Enabled
              </p>

              {/* LIVE BADGE */}

              <div
                style={{
                  marginTop:"10px",
                  color:"#4ade80",
                  fontWeight:"bold",
                }}
              >
                🟢 Live Moving
              </div>

              {/* ETA */}

              <p
                style={{
                  marginTop:"10px",
                  color:"#4ade80",
                  fontWeight:"bold"
                }}
              >
                ETA:
                {" "}
                {eta || "Calculating..."}
              </p>

              {/* DISTANCE */}

              <p
                style={{
                  color:"#38bdf8",
                  fontWeight:"bold"
                }}
              >
                Distance:
                {" "}
                {distance || "Loading..."}
              </p>

              {/* RIDER */}

              <p
                style={{
                  marginTop:"10px",
                  color:"#facc15",
                  fontWeight:"bold"
                }}
              >
                Rider:
                {" "}
                {deliveryBoy || "Searching..."}
              </p>

            </div>

          </div>

          {/* CUSTOMER INFO */}

          <div style={styles.infoCard}>

            <h3>
              Customer Live Location
            </h3>

            <p>
              Latitude:
              {" "}
              {customerLocation[0].toFixed(4)}
            </p>

            <p>
              Longitude:
              {" "}
              {customerLocation[1].toFixed(4)}
            </p>

          </div>

        </div>

        {/* MAP */}

        <div style={styles.mapCard}>

          <MapContainer
            center={[
              customerLocation[0],
              customerLocation[1],
            ]}
            zoom={15}
            style={{
              height: "100%",
              width: "100%",
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ROAD ROUTING */}

            <Routing
              customerLocation={
                customerLocation
              }

              deliveryLocation={
                deliveryLocation
              }

              setEta={setEta}

              setDistance={
                setDistance
              }
            />

            {/* CUSTOMER */}

            <Marker
              position={customerLocation}
              icon={customerIcon}
            >

              <Popup>
                Customer Location
              </Popup>

            </Marker>

            {/* DELIVERY */}

            <Marker
              position={deliveryLocation}
              icon={deliveryIcon}
              zIndexOffset={1000}
            >

              <Popup>
                {deliveryBoy || "Delivery Partner"}
              </Popup>

            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>

  );

}

const styles = {

  page:{
    minHeight:"100vh",
    background:"#020617",
    padding:"40px",
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
    alignItems:"center",
    flexWrap:"wrap",
    gap:"40px",
    position:"relative",
    zIndex:2
  },

  left:{
    flex:1,
    minWidth:"320px"
  },

  title:{
    fontSize:"65px",
    color:"white",
    marginBottom:"20px"
  },

  subtitle:{
    color:"#94a3b8",
    marginBottom:"40px",
    fontSize:"20px"
  },

  statusCard:{
    display:"flex",
    gap:"20px",
    alignItems:"center",
    padding:"30px",
    borderRadius:"30px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    color:"white",
    backdropFilter:"blur(18px)",
    marginBottom:"25px"
  },

  infoCard:{
    padding:"25px",
    borderRadius:"25px",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.08)",
    color:"white",
    backdropFilter:"blur(18px)"
  },

  mapCard:{
    flex:1,
    minWidth:"350px",
    height:"500px",
    borderRadius:"35px",
    overflow:"hidden",
    border:"1px solid rgba(255,255,255,0.08)"
  }

};

// BIKE BOUNCE ANIMATION
const styleSheet =
document.styleSheets[0];

styleSheet.insertRule(`
@keyframes bounce {

  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0px);
  }

}
`);