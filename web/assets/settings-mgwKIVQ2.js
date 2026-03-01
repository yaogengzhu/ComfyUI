const Comfy_Canvas_BackgroundImage = {
	"name": "Imagen de fondo del lienzo",
	"tooltip": "URL de la imagen para el fondo del lienzo. Puedes hacer clic derecho en una imagen del panel de resultados y seleccionar \"Establecer como fondo\" para usarla."
};
const Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "Comportamiento del clic izquierdo del ratón",
	"options": {
		"Panning": "Desplazamiento",
		"Select": "Seleccionar"
	}
};
const Comfy_Canvas_MouseWheelScroll = {
	"name": "Desplazamiento de la rueda del ratón",
	"options": {
		"Panning": "Desplazamiento",
		"Zoom in/out": "Acercar/alejar"
	}
};
const Comfy_Canvas_NavigationMode = {
	"name": "Modo de navegación del lienzo",
	"options": {
		"Custom": "Personalizado",
		"Drag Navigation": "Navegación por arrastre",
		"Standard (New)": "Estándar (Nuevo)"
	}
};
const Comfy_Canvas_SelectionToolbox = {
	"name": "Mostrar caja de herramientas de selección",
	"tooltip": "Muestra una barra de herramientas flotante cuando se seleccionan nodos, proporcionando acceso rápido a acciones comunes."
};
const Comfy_ConfirmClear = { "name": "Requerir confirmación al borrar el flujo de trabajo" };
const Comfy_DOMClippingEnabled = { "name": "Habilitar el recorte de elementos DOM (la habilitación puede reducir el rendimiento)" };
const Comfy_DevMode = { "name": "Habilitar opciones de modo de desarrollo (guardar API, etc.)" };
const Comfy_DisableFloatRounding = {
	"name": "Desactivar el redondeo predeterminado del widget flotante.",
	"tooltip": "(requiere recargar la página) No se puede desactivar el redondeo cuando el redondeo está establecido por el nodo en el backend."
};
const Comfy_DisableSliders = { "name": "Desactivar los deslizadores del widget del nodo" };
const Comfy_EditAttention_Delta = { "name": "Precisión Ctrl+arriba/abajo" };
const Comfy_EnableTooltips = { "name": "Habilitar Tooltips" };
const Comfy_EnableWorkflowViewRestore = { "name": "Guardar y restaurar la posición del lienzo y el nivel de zoom en los flujos de trabajo" };
const Comfy_Execution_PreviewMethod = {
	"name": "Método de vista previa en vivo",
	"options": {
		"auto": "auto",
		"default": "default",
		"latent2rgb": "latent2rgb",
		"none": "ninguno",
		"taesd": "taesd"
	},
	"tooltip": "Método de vista previa en vivo durante la generación de imágenes. \"default\" utiliza la configuración CLI del servidor."
};
const Comfy_FloatRoundingPrecision = {
	"name": "Decimales de redondeo del widget flotante [0 = automático].",
	"tooltip": "(requiere recargar la página)"
};
const Comfy_Graph_CanvasInfo = { "name": "Mostrar información del lienzo en la esquina inferior izquierda (fps, etc.)" };
const Comfy_Graph_CanvasMenu = { "name": "Mostrar menú del lienzo del gráfico" };
const Comfy_Graph_CtrlShiftZoom = { "name": "Habilitar atajo de zoom rápido (Ctrl + Shift + Arrastrar)" };
const Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "Eliminar duplicados de IDs de nodos en subgráficos",
	"tooltip": "Reasigna automáticamente los IDs de nodos duplicados en subgráficos al cargar un flujo de trabajo."
};
const Comfy_Graph_LinkMarkers = {
	"name": "Marcadores de punto medio de enlace",
	"options": {
		"Arrow": "Flecha",
		"Circle": "Círculo",
		"None": "Ninguno"
	}
};
const Comfy_Graph_LiveSelection = {
	"name": "Selección en vivo",
	"tooltip": "Cuando está activado, los nodos se seleccionan/deseleccionan en tiempo real mientras arrastras el rectángulo de selección, similar a otras herramientas de diseño."
};
const Comfy_Graph_ZoomSpeed = { "name": "Velocidad de zoom del lienzo" };
const Comfy_GroupSelectedNodes_Padding = { "name": "Relleno de nodos seleccionados en grupo" };
const Comfy_Group_DoubleClickTitleToEdit = { "name": "Haga doble clic en el título del grupo para editar" };
const Comfy_LinkRelease_Action = {
	"name": "Acción al soltar el enlace (Sin modificador)",
	"options": {
		"context menu": "menú contextual",
		"no action": "sin acción",
		"search box": "caja de búsqueda"
	}
};
const Comfy_LinkRelease_ActionShift = {
	"name": "Acción al soltar el enlace (Shift)",
	"options": {
		"context menu": "menú contextual",
		"no action": "sin acción",
		"search box": "caja de búsqueda"
	}
};
const Comfy_LinkRenderMode = {
	"name": "Modo de renderizado de enlace",
	"options": {
		"Hidden": "Oculto",
		"Linear": "Lineal",
		"Spline": "Spline",
		"Straight": "Recto"
	},
	"tooltip": "Controla la apariencia y visibilidad de los enlaces de conexión entre nodos en el lienzo."
};
const Comfy_Load3D_3DViewerEnable = {
	"name": "Habilitar visor 3D (Beta)",
	"tooltip": "Activa el visor 3D (Beta) para los nodos seleccionados. Esta función te permite visualizar e interactuar con modelos 3D directamente dentro del visor 3D a tamaño completo."
};
const Comfy_Load3D_BackgroundColor = {
	"name": "Color de fondo inicial",
	"tooltip": "Controla el color de fondo predeterminado de la escena 3D. Esta configuración determina la apariencia del fondo cuando se crea un nuevo widget 3D, pero puede ajustarse individualmente para cada widget después de su creación."
};
const Comfy_Load3D_CameraType = {
	"name": "Tipo de cámara inicial",
	"options": {
		"orthographic": "ortográfica",
		"perspective": "perspectiva"
	},
	"tooltip": "Controla si la cámara es perspectiva u ortográfica por defecto cuando se crea un nuevo widget 3D. Este valor predeterminado aún puede cambiarse individualmente para cada widget después de su creación."
};
const Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "Incremento de ajuste de luz",
	"tooltip": "Controla el tamaño del incremento al ajustar la intensidad de la luz en escenas 3D. Un valor de paso menor permite un control más preciso de los ajustes de iluminación, mientras que un valor mayor resulta en cambios más notorios por ajuste."
};
const Comfy_Load3D_LightIntensity = {
	"name": "Intensidad de luz inicial",
	"tooltip": "Establece el nivel de brillo predeterminado de la iluminación en la escena 3D. Este valor determina cuán intensamente las luces iluminan los objetos cuando se crea un nuevo widget 3D, pero puede ajustarse individualmente para cada widget después de su creación."
};
const Comfy_Load3D_LightIntensityMaximum = {
	"name": "Intensidad máxima de luz",
	"tooltip": "Establece el valor máximo permitido de intensidad de luz para escenas 3D. Esto define el límite superior de brillo que se puede establecer al ajustar la iluminación en cualquier widget 3D."
};
const Comfy_Load3D_LightIntensityMinimum = {
	"name": "Intensidad mínima de luz",
	"tooltip": "Establece el valor mínimo permitido de intensidad de luz para escenas 3D. Esto define el límite inferior de brillo que se puede establecer al ajustar la iluminación en cualquier widget 3D."
};
const Comfy_Load3D_PLYEngine = {
	"name": "Motor PLY",
	"options": {
		"fastply": "fastply",
		"sparkjs": "sparkjs",
		"threejs": "threejs"
	},
	"tooltip": "Selecciona el motor para cargar archivos PLY. \"threejs\" utiliza el cargador nativo Three.js PLYLoader (mejor para archivos PLY de malla). \"fastply\" utiliza un cargador optimizado para archivos PLY de nube de puntos ASCII. \"sparkjs\" utiliza Spark.js para archivos PLY de Gaussian Splatting 3D."
};
const Comfy_Load3D_ShowGrid = {
	"name": "Visibilidad inicial de la cuadrícula",
	"tooltip": "Controla si la cuadrícula es visible por defecto cuando se crea un nuevo widget 3D. Este valor predeterminado aún puede cambiarse individualmente para cada widget después de su creación."
};
const Comfy_Locale = { "name": "Idioma" };
const Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "Multiplicador de velocidad de ajuste del pincel",
	"tooltip": "Controla la rapidez con la que cambian el tamaño y la dureza del pincel al ajustar. Valores más altos significan cambios más rápidos."
};
const Comfy_MaskEditor_UseDominantAxis = {
	"name": "Bloquear ajuste del pincel al eje dominante",
	"tooltip": "Cuando está habilitado, los ajustes del pincel solo afectarán el tamaño O la dureza según la dirección en la que te muevas más"
};
const Comfy_ModelLibrary_AutoLoadAll = {
	"name": "Cargar automáticamente todas las carpetas de modelos",
	"tooltip": "Si es verdadero, todas las carpetas se cargarán tan pronto como abras la biblioteca de modelos (esto puede causar retrasos mientras se carga). Si es falso, las carpetas de modelos de nivel raíz solo se cargarán una vez que hagas clic en ellas."
};
const Comfy_ModelLibrary_NameFormat = {
	"name": "Qué nombre mostrar en la vista de árbol de la biblioteca de modelos",
	"options": {
		"filename": "nombre de archivo",
		"title": "título"
	},
	"tooltip": "Selecciona \"nombre de archivo\" para renderizar una vista simplificada del nombre de archivo bruto (sin directorio o extensión \".safetensors\") en la lista de modelos. Selecciona \"título\" para mostrar el título de metadatos del modelo configurable."
};
const Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "Modo de insignia de ID de nodo",
	"options": {
		"None": "Ninguno",
		"Show all": "Mostrar todo"
	}
};
const Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "Modo de insignia de ciclo de vida del nodo",
	"options": {
		"None": "Ninguno",
		"Show all": "Mostrar todo"
	}
};
const Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "Modo de insignia de fuente de nodo",
	"options": {
		"Hide built-in": "Ocultar incorporado",
		"None": "Ninguno",
		"Show all": "Mostrar todo"
	}
};
const Comfy_NodeBadge_ShowApiPricing = { "name": "Mostrar insignia de precios de nodo API" };
const Comfy_NodeLibrary_NewDesign = {
	"name": "Nuevo diseño de la biblioteca de nodos",
	"tooltip": "Activa la barra lateral rediseñada de la biblioteca de nodos con pestañas (Esencial, Todo, Personalizado), búsqueda mejorada y vistas previas al pasar el cursor."
};
const Comfy_NodeReplacement_Enabled = {
	"name": "Habilitar reemplazo automático de nodos",
	"tooltip": "Cuando está habilitado, los nodos faltantes pueden ser reemplazados automáticamente por sus equivalentes más nuevos si existe un mapeo de reemplazo."
};
const Comfy_NodeSearchBoxImpl = {
	"name": "Implementación de la caja de búsqueda de nodos",
	"options": {
		"default": "predeterminado",
		"litegraph (legacy)": "litegraph (legado)",
		"v1 (legacy)": "v1 (heredado)"
	}
};
const Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "Vista previa del nodo",
	"tooltip": "Solo se aplica a la implementación predeterminada"
};
const Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "Mostrar categoría de nodo en los resultados de búsqueda",
	"tooltip": "Solo se aplica a la implementación predeterminada"
};
const Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "Mostrar nombre de id de nodo en los resultados de búsqueda",
	"tooltip": "Solo se aplica a la implementación predeterminada"
};
const Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "Mostrar frecuencia de nodos en los resultados de búsqueda",
	"tooltip": "Solo se aplica a la implementación predeterminada"
};
const Comfy_NodeSuggestions_number = {
	"name": "Número de sugerencias de nodos",
	"tooltip": "Solo para el cuadro de búsqueda/contexto del menú de litegraph"
};
const Comfy_Node_AllowImageSizeDraw = { "name": "Mostrar ancho × altura debajo de la vista previa de la imagen" };
const Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "Mostrar siempre los widgets avanzados en todos los nodos",
	"tooltip": "Cuando está activado, los widgets avanzados siempre son visibles en todos los nodos sin necesidad de expandirlos individualmente."
};
const Comfy_Node_AutoSnapLinkToSlot = {
	"name": "Enlace de ajuste automático a la ranura del nodo",
	"tooltip": "Al arrastrar un enlace sobre un nodo, el enlace se ajustará automáticamente a una ranura de entrada viable en el nodo"
};
const Comfy_Node_BypassAllLinksOnDelete = {
	"name": "Mantener todos los enlaces al eliminar nodos",
	"tooltip": "Al eliminar un nodo, intenta reconectar todos sus enlaces de entrada y salida (eludiendo el nodo eliminado)"
};
const Comfy_Node_DoubleClickTitleToEdit = { "name": "Haz doble clic en el título del nodo para editarlo" };
const Comfy_Node_MiddleClickRerouteNode = { "name": "El clic medio crea un nuevo nodo de reenrutamiento" };
const Comfy_Node_Opacity = { "name": "Opacidad del nodo" };
const Comfy_Node_ShowDeprecated = {
	"name": "Mostrar nodos obsoletos en la búsqueda",
	"tooltip": "Los nodos obsoletos están ocultos por defecto en la interfaz de usuario, pero siguen siendo funcionales en los flujos de trabajo existentes que los utilizan."
};
const Comfy_Node_ShowExperimental = {
	"name": "Mostrar nodos experimentales en la búsqueda",
	"tooltip": "Los nodos experimentales están marcados como tales en la interfaz de usuario y pueden estar sujetos a cambios significativos o eliminación en futuras versiones. Úselos con precaución en flujos de trabajo de producción"
};
const Comfy_Node_SnapHighlightsNode = {
	"name": "Destacar nodo de ajuste",
	"tooltip": "Al arrastrar un enlace sobre un nodo con ranura de entrada viable, resalta el nodo"
};
const Comfy_Notification_ShowVersionUpdates = {
	"name": "Mostrar actualizaciones de versión",
	"tooltip": "Mostrar actualizaciones para nuevos modelos y funciones principales nuevas."
};
const Comfy_Pointer_ClickBufferTime = {
	"name": "Retraso de deriva del clic del puntero",
	"tooltip": "Después de presionar un botón del puntero, este es el tiempo máximo (en milisegundos) que se puede ignorar el movimiento del puntero.\n\nAyuda a prevenir que los objetos sean movidos involuntariamente si el puntero se mueve al hacer clic."
};
const Comfy_Pointer_ClickDrift = {
	"name": "Deriva del clic del puntero (distancia máxima)",
	"tooltip": "Si el puntero se mueve más de esta distancia mientras se mantiene presionado un botón, se considera arrastrar (en lugar de hacer clic).\n\nAyuda a prevenir que los objetos sean movidos involuntariamente si el puntero se mueve al hacer clic."
};
const Comfy_Pointer_DoubleClickTime = {
	"name": "Intervalo de doble clic (máximo)",
	"tooltip": "El tiempo máximo en milisegundos entre los dos clics de un doble clic. Aumentar este valor puede ayudar si a veces no se registran los doble clics."
};
const Comfy_PreviewFormat = {
	"name": "Formato de imagen de vista previa",
	"tooltip": "Al mostrar una vista previa en el widget de imagen, conviértala en una imagen ligera, por ejemplo, webp, jpeg, webp;50, etc."
};
const Comfy_PromptFilename = { "name": "Solicitar nombre de archivo al guardar el flujo de trabajo" };
const Comfy_QueueButton_BatchCountLimit = {
	"name": "Límite de conteo de lotes",
	"tooltip": "El número máximo de tareas añadidas a la cola con un solo clic de botón"
};
const Comfy_Queue_MaxHistoryItems = {
	"name": "Tamaño del historial de la cola",
	"tooltip": "El número máximo de tareas que se muestran en el historial de la cola."
};
const Comfy_Queue_QPOV2 = {
	"name": "Usar la cola de trabajos unificada en el panel lateral de Activos",
	"tooltip": "Reemplaza el panel flotante de la cola de trabajos por una cola de trabajos equivalente integrada en el panel lateral de Activos. Puedes desactivar esto para volver al diseño del panel flotante."
};
const Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "Mostrar pestaña de errores en el panel lateral",
	"tooltip": "Cuando está activado, se muestra una pestaña de errores en el panel lateral derecho para ver de un vistazo los errores de ejecución del flujo de trabajo."
};
const Comfy_Sidebar_Location = {
	"name": "Ubicación de la barra lateral",
	"options": {
		"left": "izquierda",
		"right": "derecha"
	}
};
const Comfy_Sidebar_Size = {
	"name": "Tamaño de la barra lateral",
	"options": {
		"normal": "normal",
		"small": "pequeña"
	}
};
const Comfy_Sidebar_Style = {
	"name": "Estilo de la barra lateral",
	"options": {
		"connected": "conectada",
		"floating": "flotante"
	}
};
const Comfy_Sidebar_UnifiedWidth = { "name": "Ancho unificado de la barra lateral" };
const Comfy_SnapToGrid_GridSize = {
	"name": "Tamaño de la cuadrícula para ajustar",
	"tooltip": "Al arrastrar y redimensionar nodos mientras se mantiene presionada la tecla shift, se alinearán a la cuadrícula, esto controla el tamaño de esa cuadrícula."
};
const Comfy_TextareaWidget_FontSize = { "name": "Tamaño de fuente del widget de área de texto" };
const Comfy_TextareaWidget_Spellcheck = { "name": "Corrector ortográfico del widget de área de texto" };
const Comfy_TreeExplorer_ItemPadding = { "name": "Relleno del elemento del explorador de árboles" };
const Comfy_UI_TabBarLayout = {
	"name": "Diseño de barra de pestañas",
	"options": {
		"Default": "Predeterminado",
		"Integrated": "Integrado"
	},
	"tooltip": "Controla el diseño de la barra de pestañas. \"Integrado\" mueve los controles de Ayuda y Usuario al área de la barra de pestañas."
};
const Comfy_UseNewMenu = {
	"name": "Usar nuevo menú",
	"options": {
		"Disabled": "Deshabilitado",
		"Top": "Arriba"
	},
	"tooltip": "Posición de la barra de menú. En dispositivos móviles, el menú siempre se muestra en la parte superior."
};
const Comfy_Validation_Workflows = { "name": "Validar flujos de trabajo" };
const Comfy_VueNodes_AutoScaleLayout = {
	"name": "Escalado automático del diseño (nodos Vue)",
	"tooltip": "Escala automáticamente las posiciones de los nodos al cambiar a renderizado Vue para evitar superposiciones"
};
const Comfy_VueNodes_Enabled = {
	"name": "Diseño moderno de nodos (nodos Vue)",
	"tooltip": "Moderno: Renderizado basado en DOM con interactividad mejorada, funciones nativas del navegador y diseño visual actualizado. Clásico: Renderizado tradicional en lienzo."
};
const Comfy_WidgetControlMode = {
	"name": "Modo de control del widget",
	"options": {
		"after": "después",
		"before": "antes"
	},
	"tooltip": "Controla cuándo se actualizan los valores del widget (aleatorizar/incrementar/decrementar), ya sea antes de que se encole el aviso o después."
};
const Comfy_Window_UnloadConfirmation = { "name": "Mostrar confirmación al cerrar la ventana" };
const Comfy_Workflow_AutoSave = {
	"name": "Auto Guardar",
	"options": {
		"after delay": "después de retraso",
		"off": "desactivado"
	}
};
const Comfy_Workflow_AutoSaveDelay = {
	"name": "Retraso de Auto Guardar (ms)",
	"tooltip": "Solo se aplica si Auto Guardar está configurado en \"después de retraso\"."
};
const Comfy_Workflow_ConfirmDelete = { "name": "Mostrar confirmación al eliminar flujos de trabajo" };
const Comfy_Workflow_Persist = { "name": "Persistir el estado del flujo de trabajo y restaurar en la (re)carga de la página" };
const Comfy_Workflow_ShowMissingModelsWarning = { "name": "Mostrar advertencia de modelos faltantes" };
const Comfy_Workflow_ShowMissingNodesWarning = { "name": "Mostrar advertencia de nodos faltantes" };
const Comfy_Workflow_SortNodeIdOnSave = { "name": "Ordenar IDs de nodos al guardar el flujo de trabajo" };
const Comfy_Workflow_WarnBlueprintOverwrite = { "name": "Requerir confirmación para sobrescribir un plano de subgrafo existente" };
const Comfy_Workflow_WorkflowTabsPosition = {
	"name": "Posición de los flujos de trabajo abiertos",
	"options": {
		"Sidebar": "Barra lateral",
		"Topbar": "Barra superior"
	}
};
const LiteGraph_Canvas_MaximumFps = {
	"name": "FPS máximo",
	"tooltip": "La cantidad máxima de cuadros por segundo que se permite renderizar en el lienzo. Limita el uso de la GPU a costa de la suavidad. Si es 0, se utiliza la tasa de refresco de la pantalla. Predeterminado: 0"
};
const LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "Nivel de Detalle del Nodo al Hacer Zoom - umbral de tamaño de fuente",
	"tooltip": "Controla cuándo los nodos cambian a renderizado LOD de baja calidad. Usa el tamaño de fuente en píxeles para determinar cuándo cambiar. Establece en 0 para deshabilitar. Los valores 1-24 establecen el umbral mínimo de tamaño de fuente para LOD - valores más altos (24px) = cambiar nodos a renderizado simplificado más pronto al alejar, valores más bajos (1px) = mantener calidad completa del nodo por más tiempo."
};
const LiteGraph_ContextMenu_Scaling = { "name": "Escala los menús de widgets combinados de nodos (listas) al acercar" };
const LiteGraph_Node_DefaultPadding = {
	"name": "Reducir siempre los nuevos nodos",
	"tooltip": "Redimensiona los nodos al tamaño más pequeño posible al crearlos. Si está desactivado, un nodo recién añadido se ampliará ligeramente para mostrar los valores de los widgets."
};
const LiteGraph_Node_TooltipDelay = { "name": "Retraso de la información sobre herramientas" };
const LiteGraph_Reroute_SplineOffset = {
	"name": "Desvío de la compensación de la spline",
	"tooltip": "El punto de control bezier desplazado desde el punto central de reenrutamiento"
};
const pysssss_SnapToGrid = {
	"name": "Siempre ajustar a la cuadrícula",
	"tooltip": "Cuando está activado, los nodos se alinearán automáticamente a la cuadrícula al moverlos o cambiar su tamaño."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "Verificar actualizaciones automáticamente" },
	"Comfy-Desktop_SendStatistics": { "name": "Enviar métricas de uso anónimas" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "Espejo de instalación Pypi",
		"tooltip": "Espejo de instalación pip por defecto"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "Espejo de instalación Python",
		"tooltip": "Las instalaciones de Python gestionadas se descargan del proyecto python-build-standalone de Astral. Esta variable puede establecerse en una URL de espejo para usar una fuente diferente para las instalaciones de Python. La URL proporcionada reemplazará https://github.com/astral-sh/python-build-standalone/releases/download en, por ejemplo, https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. Las distribuciones pueden leerse desde un directorio local utilizando el esquema de URL file://."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "Espejo de instalación Torch",
		"tooltip": "Espejo de instalación pip para pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "Estilo de ventana",
		"options": {
			"custom": "personalizado",
			"default": "predeterminado"
		},
		"tooltip": "Personalizado: Reemplace la barra de título del sistema con el menú superior de ComfyUI"
	},
	Comfy_Canvas_BackgroundImage,
	Comfy_Canvas_LeftMouseClickBehavior,
	Comfy_Canvas_MouseWheelScroll,
	Comfy_Canvas_NavigationMode,
	Comfy_Canvas_SelectionToolbox,
	Comfy_ConfirmClear,
	Comfy_DOMClippingEnabled,
	Comfy_DevMode,
	Comfy_DisableFloatRounding,
	Comfy_DisableSliders,
	Comfy_EditAttention_Delta,
	Comfy_EnableTooltips,
	Comfy_EnableWorkflowViewRestore,
	Comfy_Execution_PreviewMethod,
	Comfy_FloatRoundingPrecision,
	Comfy_Graph_CanvasInfo,
	Comfy_Graph_CanvasMenu,
	Comfy_Graph_CtrlShiftZoom,
	Comfy_Graph_DeduplicateSubgraphNodeIds,
	Comfy_Graph_LinkMarkers,
	Comfy_Graph_LiveSelection,
	Comfy_Graph_ZoomSpeed,
	Comfy_GroupSelectedNodes_Padding,
	Comfy_Group_DoubleClickTitleToEdit,
	Comfy_LinkRelease_Action,
	Comfy_LinkRelease_ActionShift,
	Comfy_LinkRenderMode,
	Comfy_Load3D_3DViewerEnable,
	Comfy_Load3D_BackgroundColor,
	Comfy_Load3D_CameraType,
	Comfy_Load3D_LightAdjustmentIncrement,
	Comfy_Load3D_LightIntensity,
	Comfy_Load3D_LightIntensityMaximum,
	Comfy_Load3D_LightIntensityMinimum,
	Comfy_Load3D_PLYEngine,
	Comfy_Load3D_ShowGrid,
	Comfy_Locale,
	Comfy_MaskEditor_BrushAdjustmentSpeed,
	Comfy_MaskEditor_UseDominantAxis,
	Comfy_ModelLibrary_AutoLoadAll,
	Comfy_ModelLibrary_NameFormat,
	Comfy_NodeBadge_NodeIdBadgeMode,
	Comfy_NodeBadge_NodeLifeCycleBadgeMode,
	Comfy_NodeBadge_NodeSourceBadgeMode,
	Comfy_NodeBadge_ShowApiPricing,
	Comfy_NodeLibrary_NewDesign,
	Comfy_NodeReplacement_Enabled,
	Comfy_NodeSearchBoxImpl,
	Comfy_NodeSearchBoxImpl_NodePreview,
	Comfy_NodeSearchBoxImpl_ShowCategory,
	Comfy_NodeSearchBoxImpl_ShowIdName,
	Comfy_NodeSearchBoxImpl_ShowNodeFrequency,
	Comfy_NodeSuggestions_number,
	Comfy_Node_AllowImageSizeDraw,
	Comfy_Node_AlwaysShowAdvancedWidgets,
	Comfy_Node_AutoSnapLinkToSlot,
	Comfy_Node_BypassAllLinksOnDelete,
	Comfy_Node_DoubleClickTitleToEdit,
	Comfy_Node_MiddleClickRerouteNode,
	Comfy_Node_Opacity,
	Comfy_Node_ShowDeprecated,
	Comfy_Node_ShowExperimental,
	Comfy_Node_SnapHighlightsNode,
	Comfy_Notification_ShowVersionUpdates,
	Comfy_Pointer_ClickBufferTime,
	Comfy_Pointer_ClickDrift,
	Comfy_Pointer_DoubleClickTime,
	Comfy_PreviewFormat,
	Comfy_PromptFilename,
	Comfy_QueueButton_BatchCountLimit,
	Comfy_Queue_MaxHistoryItems,
	Comfy_Queue_QPOV2,
	Comfy_RightSidePanel_ShowErrorsTab,
	Comfy_Sidebar_Location,
	Comfy_Sidebar_Size,
	Comfy_Sidebar_Style,
	Comfy_Sidebar_UnifiedWidth,
	Comfy_SnapToGrid_GridSize,
	Comfy_TextareaWidget_FontSize,
	Comfy_TextareaWidget_Spellcheck,
	Comfy_TreeExplorer_ItemPadding,
	Comfy_UI_TabBarLayout,
	Comfy_UseNewMenu,
	Comfy_Validation_Workflows,
	Comfy_VueNodes_AutoScaleLayout,
	Comfy_VueNodes_Enabled,
	Comfy_WidgetControlMode,
	Comfy_Window_UnloadConfirmation,
	Comfy_Workflow_AutoSave,
	Comfy_Workflow_AutoSaveDelay,
	Comfy_Workflow_ConfirmDelete,
	Comfy_Workflow_Persist,
	Comfy_Workflow_ShowMissingModelsWarning,
	Comfy_Workflow_ShowMissingNodesWarning,
	Comfy_Workflow_SortNodeIdOnSave,
	Comfy_Workflow_WarnBlueprintOverwrite,
	Comfy_Workflow_WorkflowTabsPosition,
	LiteGraph_Canvas_MaximumFps,
	LiteGraph_Canvas_MinFontSizeForLOD,
	LiteGraph_ContextMenu_Scaling,
	LiteGraph_Node_DefaultPadding,
	LiteGraph_Node_TooltipDelay,
	LiteGraph_Reroute_SplineOffset,
	pysssss_SnapToGrid
};
export { Comfy_Canvas_BackgroundImage, Comfy_Canvas_LeftMouseClickBehavior, Comfy_Canvas_MouseWheelScroll, Comfy_Canvas_NavigationMode, Comfy_Canvas_SelectionToolbox, Comfy_ConfirmClear, Comfy_DOMClippingEnabled, Comfy_DevMode, Comfy_DisableFloatRounding, Comfy_DisableSliders, Comfy_EditAttention_Delta, Comfy_EnableTooltips, Comfy_EnableWorkflowViewRestore, Comfy_Execution_PreviewMethod, Comfy_FloatRoundingPrecision, Comfy_Graph_CanvasInfo, Comfy_Graph_CanvasMenu, Comfy_Graph_CtrlShiftZoom, Comfy_Graph_DeduplicateSubgraphNodeIds, Comfy_Graph_LinkMarkers, Comfy_Graph_LiveSelection, Comfy_Graph_ZoomSpeed, Comfy_GroupSelectedNodes_Padding, Comfy_Group_DoubleClickTitleToEdit, Comfy_LinkRelease_Action, Comfy_LinkRelease_ActionShift, Comfy_LinkRenderMode, Comfy_Load3D_3DViewerEnable, Comfy_Load3D_BackgroundColor, Comfy_Load3D_CameraType, Comfy_Load3D_LightAdjustmentIncrement, Comfy_Load3D_LightIntensity, Comfy_Load3D_LightIntensityMaximum, Comfy_Load3D_LightIntensityMinimum, Comfy_Load3D_PLYEngine, Comfy_Load3D_ShowGrid, Comfy_Locale, Comfy_MaskEditor_BrushAdjustmentSpeed, Comfy_MaskEditor_UseDominantAxis, Comfy_ModelLibrary_AutoLoadAll, Comfy_ModelLibrary_NameFormat, Comfy_NodeBadge_NodeIdBadgeMode, Comfy_NodeBadge_NodeLifeCycleBadgeMode, Comfy_NodeBadge_NodeSourceBadgeMode, Comfy_NodeBadge_ShowApiPricing, Comfy_NodeLibrary_NewDesign, Comfy_NodeReplacement_Enabled, Comfy_NodeSearchBoxImpl, Comfy_NodeSearchBoxImpl_NodePreview, Comfy_NodeSearchBoxImpl_ShowCategory, Comfy_NodeSearchBoxImpl_ShowIdName, Comfy_NodeSearchBoxImpl_ShowNodeFrequency, Comfy_NodeSuggestions_number, Comfy_Node_AllowImageSizeDraw, Comfy_Node_AlwaysShowAdvancedWidgets, Comfy_Node_AutoSnapLinkToSlot, Comfy_Node_BypassAllLinksOnDelete, Comfy_Node_DoubleClickTitleToEdit, Comfy_Node_MiddleClickRerouteNode, Comfy_Node_Opacity, Comfy_Node_ShowDeprecated, Comfy_Node_ShowExperimental, Comfy_Node_SnapHighlightsNode, Comfy_Notification_ShowVersionUpdates, Comfy_Pointer_ClickBufferTime, Comfy_Pointer_ClickDrift, Comfy_Pointer_DoubleClickTime, Comfy_PreviewFormat, Comfy_PromptFilename, Comfy_QueueButton_BatchCountLimit, Comfy_Queue_MaxHistoryItems, Comfy_Queue_QPOV2, Comfy_RightSidePanel_ShowErrorsTab, Comfy_Sidebar_Location, Comfy_Sidebar_Size, Comfy_Sidebar_Style, Comfy_Sidebar_UnifiedWidth, Comfy_SnapToGrid_GridSize, Comfy_TextareaWidget_FontSize, Comfy_TextareaWidget_Spellcheck, Comfy_TreeExplorer_ItemPadding, Comfy_UI_TabBarLayout, Comfy_UseNewMenu, Comfy_Validation_Workflows, Comfy_VueNodes_AutoScaleLayout, Comfy_VueNodes_Enabled, Comfy_WidgetControlMode, Comfy_Window_UnloadConfirmation, Comfy_Workflow_AutoSave, Comfy_Workflow_AutoSaveDelay, Comfy_Workflow_ConfirmDelete, Comfy_Workflow_Persist, Comfy_Workflow_ShowMissingModelsWarning, Comfy_Workflow_ShowMissingNodesWarning, Comfy_Workflow_SortNodeIdOnSave, Comfy_Workflow_WarnBlueprintOverwrite, Comfy_Workflow_WorkflowTabsPosition, LiteGraph_Canvas_MaximumFps, LiteGraph_Canvas_MinFontSizeForLOD, LiteGraph_ContextMenu_Scaling, LiteGraph_Node_DefaultPadding, LiteGraph_Node_TooltipDelay, LiteGraph_Reroute_SplineOffset, settings_default as default, pysssss_SnapToGrid };

//# sourceMappingURL=settings-mgwKIVQ2.js.map