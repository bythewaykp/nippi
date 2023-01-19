
module.exports = async (client,msg,t,vars,changeVars) => {

    await msg.react('⚡');

    if(msg.fromMe || msg.author == '919947109776@c.us'){

        if(t['all']){
    
            if(vars.all){
        
                if(t['all']==1){
                    await msg.reply('_nippi_ already listens everyone')
                }
                else if(t['all']==0){

                    changeVars({
                        ...vars,
                        all:false
                    })
                    await msg.reply('_nippi_ now listens just the owner')
                }
                
            }
            else{
                if(t['all']==1){
        
                    changeVars({
                        ...vars,
                        all:true
                    })

                    await msg.reply('_nippi_ now listens everyone')
                }
                else{
                    await msg.reply('_nippi_ already listens just the owner')
                }
            }
        }
        else{
            if(vars['all']){
                await msg.reply('_nippi_ listens everyone')
            }
            else{
                await msg.reply('_nippi_ listens just the owner')
            }
        }
    }
    //message not fromMe

    else{

        if(t['all']){
            await msg.reply('you do not have priviledge to change user roles')
        }
        else{
            if(vars.all){
                await msg.reply('_nippi_ listens everyone')
            }
            else{
                // console.log('other');
                let mentions = [await client.getContactById(client.info.wid._serialized)]
                await msg.reply(
`_nippi_ listens just the owner`
                ,null,{mentions})
            }
        }
    }

    

}



