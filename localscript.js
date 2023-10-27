// POT SAMPLE
/*
cvsin_type_1
Start(mV):	-4.500000e+02
End(mV):	-4.500000e+02
Max(mV):	9.000000e+02
Min(mV):	-4.500000e+02
Freq(Hz):	8.922070e+00
Amp(mV):	8.000000e+01
Type(0-4):	0
Rate(mV/s):	5.029142e+01
Direction:	a
Scans:	1
Average:	1
Gain(0-4):	0
Initial(mV):	-4.500000e+02
Initial(ms):	0.000000e+00
Pre(mV):	-4.500000e+02
Pre(ms):	1.000000e+04
Post(mV):	0.000000e+00
Post(ms):	0.000000e+00
-4.273484e-01	5.809753e-05	0.000000e+00
-4.430911e-01	-2.223330e-06	1.638400e-03
-4.347707e-01	1.750059e-06	3.276800e-03
-4.281190e-01	-1.187643e-07	4.915200e-03
*/






// BIOLOGIC ASCII SAMPLE
/*
EC-Lab ASCII FILE
Nb header lines : 58                          

AC Voltammetry

Run on channel : 1 (SN 24152)
User : 
CE vs. WE compliance from -10 V to 10 V
Electrode connection : standard
Potential control : Ewe
Ewe ctrl range : min = -10.00 V, max = 10.00 V
Acquisition started on : 10/17/2023 11:05:00.000
Loaded Setting File : NONE
Saved on :
    File : 2023-10-17_CGP2002_NiFe30_1MKOH_HgHgO_SEQ7.2_03_ACV.mpr
    Directory : C:\Users\relab\Desktop\Clara Gohlke\data\2023-10-17\
    Host : 192.168.0.2
Device : VSP (SN 1458)
Address : 192.168.0.1
EC-Lab for windows v11.01 (software)
Internet server v11.00 (firmware)
Command interpretor v11.00 (firmware)
Electrode material : 
Initial state : 
Electrolyte : 
Comments : 
Electrode surface area : 0.001 cm²
Characteristic mass : 0.001 g
Equivalent Weight : 0.000 g/eq.
Density : 0.000 g/cm3
Volume (V) : 0.000 m³
Record Ece
Cycle Definition : Charge/Discharge alternance
Ei (V)              -0.620              
vs.                 Ref                 
dE/dt               11.444              
dE/dt unit          mV/s                
E1 (V)              0.520               
vs.                 Ref                 
fs                  9.012               
unit fs             Hz                  
A (mV)              80.000              
dt (s)              0.0004              
dI                  0.000               
unit dI             mA                  
E range min (V)     -10.000             
E range max (V)     10.000              
I Range             Auto                
I Range min         Unset               
I Range max         Unset               
I Range init        Unset               
Bandwidth           7                   
Scan to E2          0                   
E2 (V)              -0.620              
vs.                 Ref                 
nc cycles           2                   

Ewe/V	I/mA	time/s	
-6.2068063E-001	-1.5080690E-003	1.163825771410848E+003
-6.2062335E-001	-1.6941575E-004	1.163826171410838E+003
-6.2016499E-001	3.3386499E-003	1.163826571410827E+003
-6.1865640E-001	8.1389993E-003	1.163826971410817E+003
-5.4198444E-001	1.6187271E-003	1.163857171410054E+003
*/
'use strict';

// Fun note: null, undefined, 0, NaN, "" all return false for assumed conditional check

class log {
    static mbox;

    static initClass () {
        this.mbox = document.getElementById('audit');
    }
    
    static add(message) {
        // Write message to mbox with '• log :: ' prefix and a new line at the end
        this.mbox.value += `• log :: ${message}\n`;
        // Write message to console
        console.log(`• log :: ${message}`);
    }
    
    static err(message) {
        // Write message to mbox in red colour text with '• error :: ' prefix and a new line at the end
        let textNode = document.createTextNode(`• error :: ${message}\n`);
        let spanElement = document.createElement('span');
        spanElement.style.color = 'red';
        spanElement.appendChild(textNode);
        this.mbox.appendChild(spanElement);
        // Write an error to the console
        console.error(`• error :: ${message}`);
    }
    
    static clear() {
        // Clear all messages from mbox
        this.mbox.value = '';
    }
}

class mapper {
	static mprmap={
		Runonchannel : {title : null, value : null},
		User : {title : null, value : null},
		CEvsWEcompliance : {title : null, value : null},
		Electrodeconnection : {title : null, value : null},
		Potentialcontrol : {title : null, value : null},
		Ewectrlrange : {title : null, value : null},
		Acquisitionstartedon : {title : null, value : null},
		LoadedSettingFile : {title : null, value : null},
		Savedon : {title : null, value : null},
		File : {title : null, value : null},
		Directory : {title : null, value : null},
		Host : {title : null, value : null},
		Device : {title : null, value : null},
		Address : {title : null, value : null},
		Electrodematerial : {title : null, value : null},
		Initialstate : {title : null, value : null},
		Electrolyte : {title : null, value : null},
		Comments : {title : null, value : null},
		Electrodesurfacearea : {title : null, value : null},
		Characteristicmass : {title : null, value : null},
		EquivalentWeight : {title : null, value : null},
		Density : {title : null, value : null},
		Volume : {title : null, value : null},
		CycleDefinition : {title : null, value : null},
	};

    static potkeys = {}; // Hanshed array for the potlist map

    static potlist = [
        { header: 'Start(mV):', counterpart : 'Ei (V)', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1000);} },
        { header: 'End(mV):', counterpart : 'E2 (V)', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1000);} },
        { header: 'Max(mV):', counterpart : 'E1 (V)', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1000);} },
        { header: 'Min(mV):', counterpart : 'E2 (V)', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1000);} },
        { header: 'Freq(Hz):', counterpart : 'fs', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1);} },
        { header: 'Amp(mV):', counterpart : 'A (mV)', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1000);} },
        { header: 'Type(0-4):', counterpart : null, value:  '0' , process : function (ivalue) {}},
        { header: 'Rate(mV/s):', counterpart : 'dE/dt', value: null , process : function (ivalue) {this.value = mapper.formatNumber(ivalue,1);} },
        { header: 'Direction:', counterpart : null, value: 'a' , process : function (ivalue) {}},
        { header: 'Scans:', counterpart : 'nc cycles', value: null , process : function (ivalue) {this.value = ivalue;} },
        { header: 'Average:', counterpart : null, value: '1' , process : function (ivalue) {}},
        { header: 'Gain(0-4):', counterpart : null, value: '0' , process : function (ivalue) {}},
        { header: 'Initial(mV):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}},
        { header: 'Initial(ms):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}},
        { header: 'Pre(mV):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}},
        { header: 'Pre(ms):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}},
        { header: 'Post(mV):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}},
        { header: 'Post(ms):', counterpart : null, value: '0.000000e+00' , process : function (ivalue) {}}
    ];

    static initClass () {
        for (let i = 0; i < this.potlist.length; i++){
            let item = this.potlist[i]; // make a shortcut
            if (item.counterpart){
                this.potkeys[this.removeSpecialCharacters(item.counterpart)] = item;
            }
        }
    }

    static processLine = (line) => {
        var sl;
        sl = sl.split(/ {2,}/);
        if (sl.length == 1){
            sl = sl.split(" : ");
            if (sl.legth == 1){
                sl = sl.split(" from ");
            }
        }
        if (sl.legth > 1){
            let key = this.removeSpecialCharacters(sl[0].trim()); // Key to the thingy
            let title = sl[0].trim();
            let value = sl[1].trim();
            var link;
            try {
                link = this.mprmap[key];
            } catch (err) {
                log.err(err);
                return false;
            }
            link.title = title;
            link.value = value;
        }
        return false;
    }

    static removeSpecialCharacters(str) {
        return str.replace(/[\s\.\{\}\[\]\(\)]/g, '');
    }

    static formatNumber(num, multiplyer = 1) {
        num = num * multiplyer;
        let n = num.toExponential().split('e');
        let s = n[1] < 0 ? '-' : '+';
        let i = Math.abs(n[1]);
        return n[0] + 'e' + s + (i > 99 ? '' : i > 9 ? '0' : '00') + i;
    }
    
}

class ftacConv {

    static paramList = [
        { mpr: { header: 'Ei (V)', value: null }, pot: { header: 'Start(mV):', value: null } },
        { mpr: { header: 'E2 (V)', value: null }, pot: { header: 'End(mV):', value: null } },
        { mpr: { header: 'E1 (V)', value: null }, pot: { header: 'Max(mV):', value: null } },
        { mpr: { header: 'E2 (V)', value: null }, pot: { header: 'Min(mV):', value: null } },
        { mpr: { header: 'fs', value: null }, pot: { header: 'Freq(Hz):', value: null } },
        { mpr: { header: 'A (mV)', value: null }, pot: { header: 'Amp(mV):', value: null } },
        { mpr: { header: null, value: null }, pot: { header: 'Type(0-4):', value: '0' } }, // Always set to zero
        { mpr: { header: 'dE/dt', value: null }, pot: { header: 'Rate(mV/s):', value: null } },
        { mpr: { header: null, value: null }, pot: { header: 'Direction:', value: 'a' } },
        { mpr: { header: 'nc cycles', value: null }, pot: { header: 'Scans:', value: null } },
        { mpr: { header: null, value: null }, pot: { header: 'Average:', value: '1' } },
        { mpr: { header: null, value: null }, pot: { header: 'Gain(0-4):', value: '0' } },
        { mpr: { header: null, value: null }, pot: { header: 'Initial(mV):', value: '0.000000e+00' } },
        { mpr: { header: null, value: null }, pot: { header: 'Initial(ms):', value: '0.000000e+00' } },
        { mpr: { header: null, value: null }, pot: { header: 'Pre(mV):', value: '0.000000e+00' } },
        { mpr: { header: null, value: null }, pot: { header: 'Pre(ms):', value: '0.000000e+00' } },
        { mpr: { header: null, value: null }, pot: { header: 'Post(mV):', value: '0.000000e+00' } },
        { mpr: { header: null, value: null }, pot: { header: 'Post(ms):', value: '0.000000e+00' } }
    ];

    static fcache = {
        filename: null,
        contents: null,
        clear: function () {
            this.filename = null;
            this.contents = null;
        }
    }; // Holding place for file text
    static files = []; // will hold a list of { filename : string, contents : string, stats: string }
    static elements = {
        dltable: document.getElementById('dltable'),
        status: document.getElementById('status'),
        audit: document.getElementById('audit'),
    };


    static addfile(filename = null, contents = "", stats = "") {
        this.files.push({ filename: filename, contents: contents, stats: stats });
        return this.files[this.files.length - 1];
    }

    static raiseFilePicker(type = 'txt') {
        return new Promise((resolve, reject) => {
            let inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = '.' + type;

            inputElement.addEventListener('change', (event) => {
                let file = event.target.files[0];
                let reader = new FileReader();

                log.add(file.name);  // Print the filename to the console
                this.fcache.filename = file.name; // Store the filename

                reader.onload = (event) => {
                    // Assign the file's text to this.fcache
                    this.fcache.contents = event.target.result;
                    log.add("File imported");
                    resolve(this.fcache);  // Resolve the Promise with the fcache object
                };

                reader.onerror = (error) => {
                    // Reject the Promise with the error
                    reject(error);
                };

                reader.readAsText(file);
            });

            inputElement.click();
        });
    }



    static createDownloadableFile(filename, filecontents, stats, table) { // Creates a file and adds a download link
        // Create a new Blob object using filecontents
        let blob = new Blob([filecontents], { type: "text/plain;charset=utf-8" });

        // Create a link for our script to 'click'
        let downloadLink = document.createElement('a');

        // Supply the filename and mime type for the download
        downloadLink.download = filename;
        downloadLink.href = URL.createObjectURL(blob);

        // Create a new row and cells
        let dltable = document.getElementById('dltable');
        let newRow = dltable.insertRow();
        let newCell1 = newRow.insertCell();
        let newCell2 = newRow.insertCell();

        // Append the anchor element to our new cell
        newCell1.appendChild(downloadLink);

        // Change the text of the link
        downloadLink.textContent = filename;

        // Create a button for our script to 'click'
        let statsButton = document.createElement('button');

        // Add an event listener to the button
        statsButton.addEventListener('click', function () {
            alert(stats);
        });

        // Change the text of the button
        statsButton.textContent = "Show Stats";

        // Append the button element to our new cell
        newCell2.appendChild(statsButton);

        // Automatically trigger the click event to download the file
        downloadLink.click();
    }


    static async breakdownfile() {

        // Internal functions declarations

        function dataheadercheck(tstr) { // Looks for data header
            if (tstr.includes('Ewe/V') && tstr.includes('I/mA') && tstr.includes('time/s')) {
                return true;
            } else {
                return false;
            }
        }

        function splitAndTrim(tstr, delimiter = / {2,}/) { // splits key : value pairs and trims the output
            var splitString = tstr.split(delimiter);
            for (var i = 0; i < splitString.length; i++) {
                splitString[i] = splitString[i].trim();
            }
            return splitString;
        }

        function checkifneeded(tstr, paramList) { // Checks if a header parameter name corresponds to a needed value
            for (var i = 0; i < paramList.length; i++) {
                if (paramList[i].mpr.header !== null && paramList[i].mpr.header === tstr) {
                    return true;
                }
            }
            return false;
        }

        function findIndex(tstr, paramList) {
            for (var i = 0; i < paramList.length; i++) {
                if (paramList[i].mpr.header !== null && paramList[i].mpr.header === tstr) {
                    return i;
                }
            }
            return -1;
        }

        function formatNumber(num, multiplyer = 1) {
            num = Number(num) * multiplyer; // Convert to number and multiply
            num = num.toExponential(); // Covert back to scientific notation
            num = String(num); // Convert to string
            let snum = num.split('e');
            if (snum[1]){
                let sign = snum[1][0]; // copy the sign value
                snum[1] = snum[1].substring(1); // remove the sign
                snum[1] = "00" + snum[1]; // tack on a couple of zeros
                snum[1] = snum[1].slice(-2); // split off the last two characters
                snum[1] = "e" + sign + snum[1]; // re-add the 'e' and the sign
                num = snum[0] + snum[1]; // rejoin the halves
            }
            return num;
        }
        
        

        let buildpotheader = () => {
            let tstr = 'cvsin_type_1' + '\n' // Start the header
            this.paramList.forEach((header) => { // For every header line
                tstr = tstr + header.pot.header + "\t" + header.pot.value + "\n"; // Add a new header line to the temp string
            });
            filestring = tstr; // Assign the final product to filestring
        }

        // Beginning of logical loop
        try {
            this.fcache = await this.raiseFilePicker();
            // The rest of your code...
        } catch (error) {
            log.err('An error occurred:', error);
        }

        let n = 0; // My line counter
        let j = 0; // Data line counter
        let lines = this.fcache.contents.split('\n'); // Split the file up by lines
        let filename = this.fcache.filename;
        let filestring = ""; // This will hold the string that gets written to the output file
        let stats = "Stats:\n"; // Stats string
        let calcvals = {
            n : null, // number of points
            fr : null, // fundamental frequency
            dt : null, // sample rate
            n2 : null, // measurement '2^N' number. Should be an integer = Math.log(n) / Math.log(2);
            pps : null, // points per second = 1/dt
            ppw : null, // points per wave = 1/dt*fr
            tw : null, // total number of complete waves in scan = n / ppw
        }

        log.add("\nHeaders:\n"); // Print starter to console
        
        while (n < lines.length) { // Loop 'A' for header breakdown
            if (dataheadercheck(lines[n])) { // Check if header found
                log.add("Header found at line : " + (n + 1)); // Announce header line in console
                n++ // Move to the next line (begining of data)...
                break; // ...and kill the loop
            }
            let hsplit = splitAndTrim(lines[n]); // Split and trim the header << Maybe a try|catch block here
            if (hsplit[0] == "fr"){
                calcvals.fr = Number(hsplit[1]);
            } else if (hsplit[0] == "dt (s)") {
                calcvals.dt = Number(hsplit[1]);
            }
            if (hsplit.length > 1) { // If this was a key : value pair line
                if (checkifneeded(hsplit[0],this.paramList)) { // check if the key is needed
                    let param = this.paramList[findIndex(hsplit[0],this.paramList)]; // get reference to needed object
                    param.mpr.value = hsplit[1]; // Store the original 
                    param.pot.value = formatNumber(hsplit[1]); // Store a converted version in pot
                    log.add(param.mpr.header + " : " + param.mpr.value + " >> " + param.pot.header + " : " + param.pot.value); // Print results to console
                }
            }
            n++; // Increment the fileline counter
        }
        log.add("\nProcessing headers completed\n"); // Print section break to console

        buildpotheader(); // Build the header from the gathered information

        while (n < lines.length) { // Loop 'B' for data processing
            let splitline = lines[n].split('\t'); // split by tabs
            for (let i = 0; i < splitline.length; i++) {
                splitline[i] = formatNumber(splitline[i]);
            }
            let joinedLine = splitline.join("\t");  // Joins all elements of the splitline array into a string, separated by a tab
            filestring = filestring + joinedLine + "\n"; // Add the new line to the filestring
            j++; // Increment the dataline counter
            n++; // Increment the fileline counter
        }
        calcvals.n = j;
        calcvals.n2 = Math.log(j) / Math.log(2);
        calcvals.pps = 1/calcvals.dt;
        calcvals.ppw = 1/(calcvals.dt * calcvals.fr);
        log.add("\nProcessing data completed\n"); // Print section break to console
        stats = stats + "Filename: " + filename + "\n";
        stats = stats + "Datapoints in file: " + j + "\n";
        stats = stats + "No of waveforms in total: " + j + "\n";
        stats = stats + "Datapoints in file: " + j + "\n";
        stats = stats + "2n value: " + calcvals.n2 + "\n";
        stats = stats + "Points per seconds: " + calcvals.pps + "\n";
        stats = stats + "Points per wave: " + calcvals.ppw + "\n";
        // let fileref = this.addfile(filename,filestring,stats);
        this.createDownloadableFile(filename, filestring, stats, this.elements.dltable);
    }
}



