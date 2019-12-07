const express = require('express');
const bcrypt = require('../utils/util');
const pool = require('../utils/postgrepoll');
const validate = require('../utils/validate');
const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../models/userModel');

exports.createUser = async(req, res, next) => 
{
    try 
    {
        if (!req.body.userName || !req.body.password) 
        {
            return res.send({ 'message': 'Please Enter UserName And Password' });
        }
         let username = req.body.userName;

         let password = await bcrypt.getHash(req.body.password);
       let user=await User.create({
            username,
            password
        });
        console.log("User Created.",user)
        // let userName = req.body.userName;
        // let password = req.body.password;
        // let hashPass = await bcrypt.getHash(password);
        // let result = await pool.query('INSERT INTO usersTab(username, password) VALUES ($1, $2)', [userName, hashPass]);
        // res.send("User Added Successfully..");

    } 
    catch(error) 
    {



        console.log("Error accured", error);
    }
}


exports.userLogin = async (req, res, next) => 
{
    try 
    {
        if (!req.body.userName || !req.body.password) 
        {
            return res.status(400).send({ 'message': 'Please Enter UserName And Password' });
        }
        let userName = req.body.userName;
        let password = req.body.password;

        let results = await pool.query('SELECT username,password FROM usersTab WHERE username= $1', [userName]);    
         if(results.rows[0])
         {
            let dbHashPass = results.rows[0].password;
            let login = await bcrypt.checkHash(password,dbHashPass);
            if(login)
            {
             res.send(results.rows[0].username+" You are Logged In Successfully...");
            }
            else
            {
                res.send("plz enter valid password..");
            }
         }
        else
        {
            res.send("plz enter valid username..");
        }

    } 
    catch(error) 
    {
        console.log("Error accured",error);
    }
}

exports.getAllUser=async(req,res)=>
{
   try 
   {
    let results = await pool.query('SELECT id,username,password FROM usersTab ORDER BY id ASC'); 
    res.send(results.rows);
   } 
   catch (error) 
   {
       console.log("error accured ",error); 
   }
}

exports.updateUser=async(req,res)=>
{

    try 
    {
        if (!req.body.userName || !req.params.id) 
        {
            return res.status(400).send({ 'message': 'Please Enter UserName And ID' });
        }
       let result=await pool.query('UPDATE usersTab SET username = $1 WHERE id = $2',[req.body.userName,req.params.id]);
       if(result.rows)
       {
         res.send("User Updated Successfullly.....");
        }   
    } 
    catch(error) 
    {
        console.log("error accured",error);
    }
}

exports.getUserById=async(req,res)=>
{
    try 
    {
     let results = await pool.query('SELECT id,username,password FROM usersTab WHERE id = $1',[req.params.id]); 
     res.send(results.rows);
    } 
    catch (error) 
    {
        console.log("error accured ",error); 
    }
}

exports.deleteUserById= async(req,res)=>
{
    try 
    {
        let result = await pool.query('DELETE FROM usersTab WHERE id=$1',[req.params.id]);
        res.send( result.rows+" User Deleted Successfully... ")
    } 
    catch (error) 
    {
        console.log("error accured",error);
    }
}

exports.registerStudent=async(req,res)=>
{
    try 
    {
        console.log("sadsasadsasa------>",req.body.name);
         let status=await validate.validateStudent(req.body.name);    
         console.log(status);
         res.send(status)       
    } 
    catch (error) 
    {
        console.log("error accured "+error);
        
    }
}