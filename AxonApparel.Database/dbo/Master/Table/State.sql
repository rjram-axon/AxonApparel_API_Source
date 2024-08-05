CREATE TABLE [dbo].[State]
(
	 [StateId] [int] IDENTITY(1,1) NOT NULL,
	 [State] [varchar](40) NOT NULL,
	 [Lookup] [varchar](10) NULL,
	 [IsActive] [bit] NOT NULL, 
     CONSTRAINT [PK_State] PRIMARY KEY ([StateId])
)

