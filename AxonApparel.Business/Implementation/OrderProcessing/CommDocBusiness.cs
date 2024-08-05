using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    
  
   public class CommDocBusiness:ICommDocBusiness
    {
       private ICommDocRepository strrep = new CommDocRepository();

       public Common.Response<int> AddImg(Domain.CommDoc CommdocAdd)
       {
           try
           {


               return new Response<int>(strrep.AddData(new Repository.CommunicationDoc
               {
                   EntryId = CommdocAdd.Entryid,
                   DocTitle=CommdocAdd.Doctitle,
                   DocName=CommdocAdd.Docname
               }), Status.SUCCESS, "Added Successfully");
           }
           catch (Exception)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
           }
       }

       //public Common.Response<bool> UpdateImg(Domain.CommDoc CommdocUpd)
       //{
       //    try
       //    {


       //        return new Response<bool>(strrep.AddData(new Repository.CommunicationDoc
       //        {
       //            EntryId = CommdocUpd.Entryid,
       //            DocTitle = CommdocUpd.Doctitle,
       //            DocName = CommdocUpd.Docname
       //        }), Status.SUCCESS, "Added Successfully");
       //    }
       //    catch (Exception)
       //    {
       //        return new Response<bool>(0, Status.ERROR, "OOPS error occured... Please try again");
       //    }


       public Response<Domain.CommDoc> GetCommId(int commDocId)
       {
           try
           {
               var cou = strrep.GetDataById(commDocId);
               return new Response<Domain.CommDoc>(new Domain.CommDoc
               {
                 Entryid=cou.EntryId,
                 Docname=cou.DocName,
                 Doctitle=cou.DocTitle
               }, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception)
           {
               return new Response<Domain.CommDoc>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> UpdateImg(Domain.CommDoc CommdocUpd)
       {
          


               return new Response<bool>(strrep.UpdateData(new Repository.CommunicationDoc
               {
                   EntryId = CommdocUpd.Entryid,
                   DocTitle = CommdocUpd.Doctitle,
                   DocName = CommdocUpd.Docname
               }), Status.SUCCESS, "Added Successfully");
          
       }
    }
    }

