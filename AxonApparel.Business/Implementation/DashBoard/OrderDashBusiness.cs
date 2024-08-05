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
   public class OrderDashBusiness:IOrderDashBusiness
    {

       IOrderDashRepository orddashRep = new OrderDashRepository();

       public Response<IList<Domain.OrderDash>> GetOrderDetBuss(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataDashRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<OrderDash>> GetOrderDetBussDet(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataDashDetRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IList<OrderDash>> GetOrderBalBuss()
       {
           try
           {
               var CurDetList = orddashRep.GetDataDashBalRep();

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IList<OrderDash>> GetOrderRunBuss()
       {
           try
           {
               var CurDetList = orddashRep.GetDataDashRunRep();

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<Domain.OrderDash>> GetOrderStyleDetBuss(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataStyleDashRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<OrderDash>> GetOrderStyleDetBussDet(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataStyleDashDetRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<IList<Domain.OrderDash>> GetOrderBuyDetBuss(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataBuyDashRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<OrderDash>> GetOrderBuyDetBussDet(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataBuyDashDetRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<IList<Domain.OrderDash>> GetOrderYarnDetBuss(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataYarnDashRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<OrderDash>> GetOrderYarnDetBussDet(string FDt, string TDt)
       {
           try
           {
               var CurDetList = orddashRep.GetDataYarnDashDetRep(FDt, TDt);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IList<Domain.OrderDash>> GetOrderWiseDetBuss(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataOrderDashRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IList<OrderDash>> GetOrderWiseDetBussDet(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataOrderDashDetRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }



       public Response<IList<OrderDash>> GetOrderDesDetBuss(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataDetDashRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IList<OrderDash>> GetOrderDesDetBussDet(string frmDate, string ToDate)
       {
           try
           {
               var CurDetList = orddashRep.GetDataDetDashDetRep(frmDate, ToDate);

               return new Response<IList<Domain.OrderDash>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IList<Domain.OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IEnumerable<OrderDash>> LoadChatUsers(int FromUserId)
       {
           try
           {
               var couList = orddashRep.LoadChatUsers(FromUserId);
               return new Response<IEnumerable<OrderDash>>(couList.Select(m => new OrderDash
               {
                   Chat_UserId = (m.Chat_UserId == null ? 0 : m.Chat_UserId),
                   Chat_Username = (m.Chat_Username == null ? "" : m.Chat_Username),
                   Chat_Message = (m.Chat_Message == null ? "" : m.Chat_Message),
                   Chat_Time = (m.Chat_Time == null ? "" : m.Chat_Time),

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IEnumerable<OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IEnumerable<OrderDash>> LoadChatUsers_NewMessage(int FromUserId)
       {
           try
           {
               var couList = orddashRep.LoadChatUsers_NewMessage(FromUserId);
               return new Response<IEnumerable<OrderDash>>(couList.Select(m => new OrderDash
               {
                   Chat_UserId = (m.Chat_UserId == null ? 0 : m.Chat_UserId),
                   Chat_Username = (m.Chat_Username == null ? "" : m.Chat_Username),
                   Chat_Message = (m.Chat_Message == null ? "" : m.Chat_Message),
                   Chat_Time = (m.Chat_Time == null ? "" : m.Chat_Time),
                   TimeTaken = (m.TimeTaken == null ? "" : m.TimeTaken),

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IEnumerable<OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IEnumerable<OrderDash>> LoadChatUsers_GetNewMessageCount(int FromUserId)
       {
           try
           {
               var couList = orddashRep.LoadChatUsers_GetNewMessageCount(FromUserId);
               return new Response<IEnumerable<OrderDash>>(couList.Select(m => new OrderDash
               {
                   Chat_NewMsgCnt = (m.Chat_NewMsgCnt == null ? 0 : m.Chat_NewMsgCnt),

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IEnumerable<OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IEnumerable<OrderDash>> LoadChatMsg(int FromUserId, int ToUserId)
       {
           try
           {
               var couList = orddashRep.LoadChatMsg(FromUserId, ToUserId);
               return new Response<IEnumerable<OrderDash>>(couList.Select(m => new OrderDash
               {
                   Chat_UserId = (m.Chat_UserId == null ? 0 : m.Chat_UserId),
                   Chat_Username = (m.Chat_Username == null ? "" : m.Chat_Username),
                   Chat_Message = (m.Chat_Message == null ? "" : m.Chat_Message),
                   Chat_Time = (m.Chat_Time == null ? "" : m.Chat_Time),
                   Chat_Isfromuser = (m.Chat_Isfromuser == null ? 0 : m.Chat_Isfromuser),

                   Chat_ToUsername = (m.Chat_ToUsername == null ? "" : m.Chat_ToUsername),

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IEnumerable<OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IEnumerable<OrderDash>> LoadAllMsg(int FromUserId)
       {
           try
           {
               var couList = orddashRep.LoadAllMsg(FromUserId);
               return new Response<IEnumerable<OrderDash>>(couList.Select(m => new OrderDash
               {
                   Chat_UserId = (m.Chat_UserId == null ? 0 : m.Chat_UserId),
                   Chat_Username = (m.Chat_Username == null ? "" : m.Chat_Username),
                   Chat_Message = (m.Chat_Message == null ? "" : m.Chat_Message),
                   Chat_Time = (m.Chat_Time == null ? "" : m.Chat_Time),
                   Chat_Isfromuser = (m.Chat_Isfromuser == null ? 0 : m.Chat_Isfromuser),

                   Chat_ToUsername = (m.Chat_ToUsername == null ? "" : m.Chat_ToUsername),

               }), Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IEnumerable<OrderDash>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Common.Response<bool> CreateUnitEntry(OrderDash MasEntry)
       {
           string IRem = "";
           try
           {
               int? StrUnit = 0;

               AxonApparel.Repository.TandA_Chat ProcIns = new AxonApparel.Repository.TandA_Chat
               //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
               {
                   Id = MasEntry.Add_Id,
                   From_Id = MasEntry.Add_From_Id,
                   To_Id = MasEntry.Add_To_Id,
                   Chat_Message = MasEntry.Add_Chat_Message,
                   Chat_Time = MasEntry.Add_Chat_Time
               };

               var result = orddashRep.AddDetData(ProcIns);

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
           }
       }

       public Common.Response<bool> Update_IsRead(OrderDash MasEntry)
       {
           string IRem = "";
           try
           {
               int? StrUnit = 0;

               AxonApparel.Repository.TandA_Chat ProcIns = new AxonApparel.Repository.TandA_Chat
               {
                   From_Id = MasEntry.Add_From_Id,
                   To_Id = MasEntry.Add_To_Id //,
                   // IsRead = MasEntry.IsRead
               };

               var result = orddashRep.Update_IsRead(ProcIns);

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }
    }
}
