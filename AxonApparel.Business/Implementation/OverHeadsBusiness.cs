using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class OverHeadsBusiness:IOverHeadsBusiness
    {
       IOverHeadsRepository repo = new OverHeadsRepository();


       //public Response<IQueryable<OverHeads>> GetOverHeads()
       //{
       //    try
       //    {

       //        var accheList = repo.GetDataList();

       //        return new Response<IQueryable<Domain.OverHeads>>(accheList.Select(m => new Domain.OverHeads
       //        {
       //            isactive = m.IsActive ? "TRUE" : "FALSE",
       //            commercialid=m.commercialid,
       //            commercial=m.commercial,
       //            costtype=m.CostType
                   
       //        }), Status.SUCCESS, "Fetched Successfully");

       //    }
       //    catch (Exception)
       //    {
       //        return new Response<IQueryable<Domain.OverHeads>>(null, Status.ERROR, "OOPS error occured. Plase try again");
       //    }
       //}

       public Response<IEnumerable<OverHeads>> GetOverHeads()
       {
           try
           {

               var accheList = repo.GetDataAllList();

               return new Response<IEnumerable<Domain.OverHeads>>(accheList.Select(m => new Domain.OverHeads
               {
                   isactive = m.IsActive ? "TRUE" : "FALSE",
                   commercialid = m.commercialid,
                   commercial = m.commercial,
                   costtype = m.CostType

               }), Status.SUCCESS, "Fetched Successfully");

           }
           catch (Exception)
           {
               return new Response<IEnumerable<Domain.OverHeads>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<OverHeads> GetOverHeadsId(int OverHeadsId)
       {
           try
           {

               var accheList = repo.GetDataById(OverHeadsId);

               return new Response<Domain.OverHeads>(new Domain.OverHeads
               {
                  
                   isactive = accheList.IsActive ? "TRUE" : "FALSE",
                   commercialid=accheList.commercialid,
                   commercial=accheList.commercial,
                   costtype=accheList.CostType
                  
               }, Status.SUCCESS, "Fetched Successfully");

           }
           catch
           {
               return new Response<Domain.OverHeads>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<int> CreateOverHeads(OverHeads OverHeadsAdd)
       {
           try
           {
               if (string.IsNullOrEmpty(OverHeadsAdd.commercial)) return new Response<int>(0, Status.ERROR, "Given Commercial is empty");
               if (isNameAvailableAlready(OverHeadsAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given season is already available");

               return new Response<int>(repo.AddData(new AxonApparel.Repository.Commercialmas
               {

                   IsActive = OverHeadsAdd.isactive.ToUpper() == "TRUE",
                   commercialid=OverHeadsAdd.commercialid,
                   commercial=OverHeadsAdd.commercial,
                   CostType=OverHeadsAdd.costtype
                 
               }), Status.SUCCESS, "Added Successfully");
           }
           catch (Exception)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       private bool isNameAvailableAlready(Domain.OverHeads ovh, string mode)
       {
           if (mode.ToUpper() == "ADD")
           {
               return (GetOverHeads().Value.Where(c => c.commercial.ToUpper() == ovh.commercial.ToUpper()).ToList().Count > 0);
           }
           else if (mode.ToUpper() == "UPDATE")
           {
               return (GetOverHeads().Value.Where(c => c.commercial.ToUpper() == ovh.commercial.ToUpper() && c.commercialid != ovh.commercialid).ToList().Count > 0);
           }
           return false;
       }
       public Response<bool> UpdateOverHeads(OverHeads OverHeadsUpd)
       {
           if (isNameAvailableAlready(OverHeadsUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given OverHeads is already available");

           return new Response<bool>(repo.UpdateData(new AxonApparel.Repository.Commercialmas
           {

               IsActive = OverHeadsUpd.isactive.ToUpper() == "TRUE",
               commercialid=OverHeadsUpd.commercialid,
               commercial=OverHeadsUpd.commercial,
               CostType=OverHeadsUpd.costtype
              
           }), Status.SUCCESS, "Updated Successfully");
       }

       public Response<bool> DeleteOverHeads(int OverHeadsId)
       {
           return new Response<bool>(repo.DeleteData(OverHeadsId), Status.SUCCESS, "Deleted Successfully");
       }
    }
}
