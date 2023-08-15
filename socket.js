const io=require('socket.io')(5000 ||process.env.PORT,{
	cors:{
		orgin:['*'],
	}
})
let Socketusers=[]
io.on('connection',socket=>{
	socket.on('add-user',id=>{
		addUser(id,socket.id)
	})
	socket.on('send-message',(({reciever,message})=>{
		const Suser=Socketusers.filter(user=>user.id===reciever)
		console.log("message sent :",Suser) 
		if(!Suser[0]){
			console.log("No Suser");
			return
		}
		socket.to(Suser[0].socketId).emit('priv-msg',message);
	}))
	


	socket.on('disconnect',()=>{
		removeUser(socket.id)
	})
})
const addUser=(id,soId)=>{
	Socketusers=Socketusers.filter(user=>user.id!==id)
	Socketusers.push({id:id,socketId:soId})
	console.log(Socketusers)
}
const removeUser=(soid)=>{
	Socketusers=Socketusers.filter(user=>user.socketId!==soid)
	console.log(Socketusers)
}
