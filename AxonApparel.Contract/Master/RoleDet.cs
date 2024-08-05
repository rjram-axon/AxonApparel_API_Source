using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class RoleDet
    {
        public int DetId { get; set; }
        public int RoleMasId { get; set; }
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public int AllFlg { get; set; }
        public int AddFlg { get; set; }
        public int EditFlg { get; set; }
        public int DelFlg { get; set; }
        public int PrintFlg { get; set; }
    }
}
