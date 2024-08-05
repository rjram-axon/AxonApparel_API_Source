using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
   public class P3EntryBusiness:IP3EntryBusiness
    {
       IP3EntryRepository obj = new P3EntryRepository();

       public Response<int> Create(Domain.P3Entry ObjAdd)
       {
           try
           {


               return new Response<int>(obj.AddData(new Repository.P3Entry
               {

                   P3EntryId = ObjAdd.P3EntryId,
                   Buy_Ord_MasId = ObjAdd.Buy_Ord_MasId,
                   Yarn_PO = ObjAdd.Yarn_PO,
                   Remarks = ObjAdd.Remarks,
                   Yarn_IH = ObjAdd.Yarn_IH,
                   Fab_IH = ObjAdd.Fab_IH,
                   IsActive = ObjAdd.IsActive.ToUpper() == "TRUE"

               }), Status.SUCCESS, "Added Successfully");
           }
           catch (Exception)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.P3Entry>> GetData()
       {
           try
           {
               var couList = obj.GetDataList();
               return new Response<IQueryable<Domain.P3Entry>>(couList.Select(m => new Domain.P3Entry
               {
                   RefNo = m.Buy_Ord_Mas.Ref_No,
                   Yarn_IH = m.Yarn_IH,
                   Remarks = m.Remarks,
                   P3EntryId = m.P3EntryId,
                   Buy_Ord_MasId = m.Buy_Ord_MasId,
                   IsActive = m.IsActive ? "TRUE" : "FALSE",
                   Yarn_PO = m.Yarn_PO,
                   Fab_IH = m.Fab_IH

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.P3Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<Domain.P3Entry> GetId(int Id)
       {
           try
           {
               var cou = obj.GetDataById(Id);
               return new Response<Domain.P3Entry>(new Domain.P3Entry
               {
                   P3EntryId = cou.P3EntryId,
                   Buy_Ord_MasId = cou.Buy_Ord_MasId,
                   Yarn_PO = cou.Yarn_PO,
                   Remarks = cou.Remarks,
                   RefNo = cou.Buy_Ord_Mas.Ref_No,
                   Yarn_IH = cou.Yarn_IH,
                   Fab_IH = cou.Fab_IH
               }, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception)
           {
               return new Response<Domain.P3Entry>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<bool> Update(Domain.P3Entry Upd)
       {
           try
           {


               return new Response<bool>(obj.UpdateData(new Repository.P3Entry
               {

                   P3EntryId = Upd.P3EntryId,
                   Buy_Ord_MasId = Upd.Buy_Ord_MasId,
                   Fab_IH = Upd.Fab_IH,
                   Remarks = Upd.Remarks,
                   Yarn_IH = Upd.Yarn_IH,
                   Yarn_PO = Upd.Yarn_PO,
                   IsActive = Upd.IsActive.ToUpper() == "TRUE"

               }), Status.SUCCESS, "Updated Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<bool> Delete(int Id)
       {
           return new Response<bool>(obj.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
       }


       public Response<IList<Domain.P3Entry>> GetP3Entry()
       {
           try
           {
               var CurDetList = obj.GetP3Entry();

               return new Response<IList<Domain.P3Entry>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.P3Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
