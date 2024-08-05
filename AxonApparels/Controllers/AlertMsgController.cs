using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Speech.Synthesis;
using System.Speech.AudioFormat;
using System.IO;
//using NAudio.Wave;
//using NAudio.Lame;
using System.Threading;


namespace AxonApparels.Controllers
{
    public class AlertMsgController : Controller
    {
        //     
        // GET: /AlertMsg/

        public ActionResult Index()
        {
          
            return PartialView("~/Views/AlertMsg/AlertMsg_partial.cshtml");
        }


        public void test() {

            SpeechSynthesizer sp = new SpeechSynthesizer();
            sp.Volume = 100;
            //sp.Speak("HELLO");
            //string appPath = AppDomain.CurrentDomain.BaseDirectory;
            //sp.SetOutputToWaveFile(@"C:\MyWavFile.wav");
            //sp.Speak("Data Saved successfully");
            ////sp.Dispose();
            //sp.SpeakAsyncCancelAll();
            //sp.Dispose();
           
         
            //sp.Volume = 100;
            //sp.Rate = 0; //medium

            ////save to memory stream
            //MemoryStream ms = new MemoryStream();
            //sp.SetOutputToWaveStream(ms);

            ////do speaking
            //sp.Speak("This is a test mp3");

            ////now convert to mp3 using LameEncoder or shell out to audiograbber
            //NAudio.Lame.(ref ms, "mytest.mp3");
        
        }

        //[HttpPost]
        //public async Task<ActionResult> TTS(string text)
        //{
        //    // you can set output file name as method argument or generated from text
        //    string fileName = "fileName";
        //    Task<ViewResult> task = Task.Run(() =>
        //    {
        //        using (SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer())
        //        {
        //            speechSynthesizer.SetOutputToWaveFile(Server.MapPath("~/path/to/file/") + fileName + ".wav");
        //            speechSynthesizer.Speak(text);

        //            ViewBag.FileName = fileName + ".wav";
        //            return View();
        //        }
        //    });
        //    return await task;
        //}


    }
}
