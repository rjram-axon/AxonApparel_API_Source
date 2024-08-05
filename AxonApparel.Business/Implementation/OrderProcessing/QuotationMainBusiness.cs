using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public class QuotationMainBusiness:IQuotationMainBusiness
    {
       IQuotationMainRepository stkRep = new QuotationMainRepository();

       public Common.Response<IQueryable<Domain.MarkQuoteMas>> GetDataMainList(int? companyId, int? buyerid, string quotetype, string quoteno, string enqno, int? styleid, string fromDate, string todate,string RefNo)
       {
           try
           {
               var CurDetList = stkRep.GetDataMainList(companyId, buyerid, quotetype, quoteno, enqno, styleid, fromDate, todate, RefNo);

               return new Response<IQueryable<Domain.MarkQuoteMas>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.MarkQuoteMas>> GetDetRecNo(int id)
       {
           try
           {
               var ProductIm = stkRep.GetRepDetRecNo(id);

               return new Response<IQueryable<Domain.MarkQuoteMas>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.MarkQuoteMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
