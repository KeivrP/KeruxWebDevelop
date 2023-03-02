module Cont
  #método se utiliza en Rails para establecer un prefijo de tabla para los modelos que pertenecen al módulo
  def self.table_name_prefix
    'cont_'
  end
end
