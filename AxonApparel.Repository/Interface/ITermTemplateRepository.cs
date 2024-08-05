using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface ITermTemplateRepository
    {
        bool AddDetData(List<TermDet> objTDet);
        IQueryable<Domain.Terms> GetDataMainList();

        IQueryable<Domain.Terms> GetDataTermRepEditDetails(int Id);
        IList<Domain.TermDet> GetRepEntryEditItemLoad(int Id);
        bool UpdateDetData(List<TermDet> objUDet);
        bool DeleteDetData(List<TermDet> objDDet);
    }
}
