import React, { useState } from "react";



function Signup() {


  return (
      <> 
    <form class="w-full max-w-lg p-20 border-4 rounded-lg justify-center">
     <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-first-name">
            First Name
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="grid-first-name" type="text" placeholder="Jane"/>
        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Last Name
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="grid-last-name" type="text" placeholder="Doe"/>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Email
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="grid-password" type="password" placeholder="******************"/>
        <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
    </div>
   
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="grid-password" type="password" placeholder="******************"/>
        <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Comfirm Password
        </label>
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mb-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" id="grid-password" type="password" placeholder="******************"/>
        <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Day(DD)
        </label>
        <div class="relative">
            <input class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="number" min="1" max="31"/>
        </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Month(MM)
        </label>
        <div class="relative">
            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-53 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option id="1">January</option>
                <option id="2">February</option>
                <option id="3">March</option>
                <option id="4">April</option>
                <option id="5">May</option>
                <option id="6">June</option>
                <option id="7">July</option>
                <option id="8">August</option>
                <option id="9">September</option>
                <option id="10">October</option>
                <option id="11">November</option>
                <option id="12">December</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Year(YYYY)
        </label>
        <div class="relative">
            <input class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="number" min="1935" max="2003"/>
        </div>
        </div>
    </div>
    </form>
    </>
  )
}
export default Signup