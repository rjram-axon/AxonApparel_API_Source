using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class OrderDash
    {
        public decimal OPerCent { get; set; }
        public decimal DPerCent { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Process { get; set; }
        public decimal TotProdRunQty { get; set; }
        public decimal TotDesQty { get; set; }
        public decimal TotBalQty { get; set; }
        public string stlye { get; set; }
        public int stlyeid { get; set; }
        public string Buyer { get; set; }
        public int Buyerid { get; set; }
        public decimal DStyleQty { get; set; }
        public decimal BuyQty { get; set; }

        public string Item { get; set; }
        public int ItemId { get; set; }
        public decimal ItmStkQty { get; set; }

        public string  OrdStkItem { get; set; }
        public decimal OrdStkQty { get; set; }

        public int Chat_UserId { get; set; }
        public string Chat_Username { get; set; }
        public string Chat_Message { get; set; }
        public string Chat_Time { get; set; }

        public string TimeTaken { get; set; }

        public int Chat_NewMsgCnt { get; set; }

        public int Chat_Isfromuser { get; set; }
        public string Chat_ToUsername { get; set; }

        public int Add_Id { get; set; }
        public int Add_From_Id { get; set; }
        public int Add_To_Id { get; set; }
        public string Add_Chat_Message { get; set; }
        public DateTime Add_Chat_Time { get; set; }
        public bool Add_IsRead { get; set; }
  
    }
}
