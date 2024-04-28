
import React, { useEffect, useRef, useState } from "react";

export default function Dashboard() {
	const webSocket = useRef(null);
	useEffect(() => {
		webSocket.current = new WebSocket(
		process.env.NEXT_PUBLIC_WSS_URL + "/ws"
		);
		webSocket.current.onmessage = (e) => {
			try {
				console.log("WebSocket message");
				if (e.data == "") return;
				const data = JSON.parse(e.data);

				for (let i = 0; i < data.length; i++) {
					const base64String = data[i].image;//data[i].image.slice(2, -1);
					const binaryImageData = Buffer.from(base64String, 'base64');
					const imageUrl = `data:image/jpeg;base64,${binaryImageData.toString('base64')}`;
					data[i].image = imageUrl;

					const dateTime = new Date(data[i].timestamp);
					const year = dateTime.getFullYear();
					const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Month is 0-indexed
					const day = ('0' + dateTime.getDate()).slice(-2);
					const hours = ('0' + dateTime.getHours()).slice(-2);
					const minutes = ('0' + dateTime.getMinutes()).slice(-2);
					const seconds = ('0' + dateTime.getSeconds()).slice(-2);
					data[i].date = `${year}-${month}-${day}`;
					data[i].time = `${hours}:${minutes}:${seconds}`;
				}
				const getItemsByClass = (data, className) => data.filter(item => item.class === className);

				setCats(getItemsByClass(data, "cat"));
				setDogs(getItemsByClass(data, "dog"));
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		return () => webSocket.current.close();
	}, []);

	const [base64ImageData, setBase64ImageData] = useState("");
	const [cats, setCats] = useState([]);
	const [dogs, setDogs] = useState([]);
	

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch(process.env.NEXT_PUBLIC_HTTP_URL + "/recent_images", {
			  method: "GET",
			});
			if (!response) {
			  console.log("didt work");
			  return;
			}
			const data = await response.json();

			for (let i = 0; i < data.length; i++) {
				const base64String = data[i].image;//data[i].image.slice(2, -1);
				const binaryImageData = Buffer.from(base64String, 'base64');
				const imageUrl = `data:image/jpeg;base64,${binaryImageData.toString('base64')}`;
				data[i].image = imageUrl;

				const dateTime = new Date(data[i].timestamp);
				const year = dateTime.getFullYear();
				const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Month is 0-indexed
				const day = ('0' + dateTime.getDate()).slice(-2);
				const hours = ('0' + dateTime.getHours()).slice(-2);
				const minutes = ('0' + dateTime.getMinutes()).slice(-2);
				const seconds = ('0' + dateTime.getSeconds()).slice(-2);
				data[i].date = `${year}-${month}-${day}`;
				data[i].time = `${hours}:${minutes}:${seconds}`;

			}
			const getItemsByClass = (data, className) => data.filter(item => item.class === className);

			setCats(getItemsByClass(data, "cat"));
			setDogs(getItemsByClass(data, "dog"));
			console.log(data);
			console.log(cats);
			console.log(dogs);


			/*
			const base64String = data[0].image.slice(2, -1);
			const binaryImageData = Buffer.from(base64String, 'base64');
			const imageUrl = `data:image/jpeg;base64,${binaryImageData.toString('base64')}`;
			
			setBase64ImageData(imageUrl);
			*/

		  } catch (e) {
			console.log(e);
		  }
		};
		fetchData().catch(console.error);
	  }, []);
  

	  return (
		<>
			<h1 className="mb-3 text-2xl font-semibold">Dashboard</h1>
			<h3 className="mb-3 text-1xl font-semibold">Cats</h3>
			<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
				{cats.map((cat, index) => (
					<div key={index}>
						<img src={cat.image} 
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
						alt="Cat Image" />
						<p> {cat.time} </p>
						<p> {cat.date} </p>
					</div>
				))}
			</div>
			<h3 className="mb-3 text-1xl font-semibold">Dogs</h3>
			<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
				{dogs.map((dog, index) => (
					<div key={index}>
						<img src={dog.image} 
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
						alt="Dog Image" />
						<p> {dog.time} </p>
						<p> {dog.date} </p>
					</div>
				))}
			</div>
			{ /*
			<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-2 lg:text-left">
				<div>
					<img src={base64ImageData} 
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					alt="Base64 Image" />
				</div>
				<div>
					<img src={base64ImageData} 
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					alt="Base64 Image" />
				</div>
			</div>
				*/}
		</>
  );
}