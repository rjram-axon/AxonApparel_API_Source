using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public class BuyerChargesBusiness:IBuyerChargesBusiness
    {
       private IBuyerChargesRepository strrep = new BuyerChargesRepository();

       public Common.Response<int> Add(Domain.BuyerCharges obj)
       {
           try
           {
               AxonApparel.Repository.BuyerCharges Insert = new AxonApparel.Repository.BuyerCharges
               {
                   BuyerId = obj.BuyerId, 

               };              

               var List = new List<Repository.BuyerCharges>();
               if (obj.ListDetails != null)
               {
                   foreach (var itemlist in obj.ListDetails)
                   {
                       List.Add(new Repository.BuyerCharges
                       {
                           BuyerId = itemlist.BuyerId,
                           FromQuantity=itemlist.FromQuantity,
                           ToQuantity=itemlist.ToQuantity,
                           ShippingExpense=itemlist.ShippingExpense,
                           CIFExpense=itemlist.CIFExpense,
                           BankExpense=itemlist.BankExpense,
                           
                         
                       });
                   }
               }

               var result = strrep.AddData(Insert, List, "Add");

               return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

           }
           catch (Exception ex)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
           }
       }


       public Response<IQueryable<Domain.BuyerCharges>> LoadMaingrid()
       {
           try
           {
               var CurDetList = strrep.LoadMaingrid();

               return new Response<IQueryable<Domain.BuyerCharges>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.BuyerCharges>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       
       public Response<IList<Domain.BuyerCharges>> GetbyId(int BuyerId)
       {
           try
           {
               var CurDetList = strrep.GetbyId(BuyerId);

               return new Response<IList<Domain.BuyerCharges>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.BuyerCharges>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
           
       }


       public Response<int> Update(Domain.BuyerCharges obj)
       {
           try
           {
               AxonApparel.Repository.BuyerCharges Insert = new AxonApparel.Repository.BuyerCharges
               {
                   BuyerId = obj.BuyerId,

               };

               var List = new List<Repository.BuyerCharges>();
               if (obj.ListDetails != null)
               {
                   foreach (var itemlist in obj.ListDetails)
                   {
                       List.Add(new Repository.BuyerCharges
                       {
                           BuyerId = itemlist.BuyerId,
                           FromQuantity = itemlist.FromQuantity,
                           ToQuantity = itemlist.ToQuantity,
                           ShippingExpense = itemlist.ShippingExpense,
                           CIFExpense = itemlist.CIFExpense,
                           BankExpense = itemlist.BankExpense,


                       });
                   }
               }

               var result = strrep.UpdData(Insert, List, "Add");

               return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

           }
           catch (Exception ex)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
           }
       }


       public Response<int> Delete(Domain.BuyerCharges obj)
       {
           try
           {
               AxonApparel.Repository.BuyerCharges Insert = new AxonApparel.Repository.BuyerCharges
               {
                   BuyerId = obj.BuyerId,

               };

               var List = new List<Repository.BuyerCharges>();
               if (obj.ListDetails != null)
               {
                   foreach (var itemlist in obj.ListDetails)
                   {
                       List.Add(new Repository.BuyerCharges
                       {
                           BuyerId = itemlist.BuyerId,
                           FromQuantity = itemlist.FromQuantity,
                           ToQuantity = itemlist.ToQuantity,
                           ShippingExpense = itemlist.ShippingExpense,
                           CIFExpense = itemlist.CIFExpense,
                           BankExpense = itemlist.BankExpense,


                       });
                   }
               }

               var result = strrep.DelData(Insert, List, "Add");

               return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

           }
           catch (Exception ex)
           {
               return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
           }
       }


     


       public Response<Domain.BuyerCharges> ListMainGrid(int buyid)
       {
           try
           {
               var Lman = strrep.ListMainGrid(buyid);
               return new Response<Domain.BuyerCharges>(new Domain.BuyerCharges
               {
                   BuyerId = (int)Lman.BuyerId,
               }, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception)
           {
               return new Response<Domain.BuyerCharges>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
