using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IStyleRepository:IBaseRepository<StyleHeader>
    {
        bool AddDetData(List<StyleDetail> objCDet,string Mode,int StyleId=0);
        //List<StyleDetail> GetDetDataList(int StyleId);

        IQueryable<Domain.Style> GetDataMainList();
        IList<Domain.Style> GetRepStyleCheckItemDetails(int StyleId);

    }
}
